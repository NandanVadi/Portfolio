"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

function NeuralOrbMesh({ scrollYProgress }: { scrollYProgress: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, camera, size } = useThree();
  
  // Custom Shader Material
  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uHover;
    uniform float uScroll;
    
    // Simplex Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float cnoise(vec3 P) {
      vec3 Pi0 = floor(P);
      vec3 Pi1 = Pi0 + vec3(1.0);
      Pi0 = mod289(Pi0);
      Pi1 = mod289(Pi1);
      vec3 Pf0 = fract(P);
      vec3 Pf1 = Pf0 - vec3(1.0);
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;
      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);
      vec4 gx0 = ixy0 * (1.0 / 7.0);
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
      vec4 gx1 = ixy1 * (1.0 / 7.0);
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
      vec3 fade_xyz = Pf0 * Pf0 * Pf0 * (Pf0 * (Pf0 * 6.0 - 15.0) + 10.0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
      return 2.2 * n_xyz;
    }

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      
      // ── SCROLL PHASES ───────────────────────────────────────────────
      // 0.00 -> 0.15 : calm intelligence
      // 0.15 -> 0.38 : tension build — compression & tight vibration
      // 0.38 -> 0.45 : impact / shockwave — massive energy release
      // 0.45 -> 0.85 : dispersal — elegant scatter
      
      float tension   = smoothstep(0.15, 0.38, uScroll) * (1.0 - smoothstep(0.38, 0.42, uScroll));
      float shockwave = smoothstep(0.38, 0.45, uScroll) * (1.0 - smoothstep(0.45, 0.55, uScroll));
      float disperse  = smoothstep(0.42, 0.85, uScroll);
      
      // ── BASE BREATHING ──────────────────────────────────────────────
      float n0 = cnoise(position * 1.0 + uTime * 0.12);
      float n1 = cnoise(position * 1.8 - uTime * 0.09);
      float baseDeform = n0 * 0.06 + n1 * 0.03;
      
      // ── HOVER INTELLIGENCE ──────────────────────────────────────────
      float hoverAmt = mix(0.0, 0.18, uHover);
      float hNoise = cnoise(position * 2.0 + uTime * 0.3);
      float hoverDeform = hNoise * hoverAmt;
      
      // ── TENSION COMPRESSION & VIBRATION ─────────────────────────────
      // Orb shrinks slightly as if pulling energy inward.
      // High-frequency, low-amplitude vibration builds pressure.
      float compression = tension * -0.25; // Shrink by 25%
      float vibNoise = cnoise(position * 15.0 + uTime * 25.0) * tension * 0.04;
      
      // Surface cracks tighten
      float crackPattern = abs(sin(position.y * 10.0 + uTime * 2.0))
                         * abs(cos(position.x * 10.0 - uTime * 2.0));
      float crack = crackPattern * tension * 0.05;
      
      // ── SHOCKWAVE IMPACT ────────────────────────────────────────────
      // Explosive outward ripple propagating from center
      float impactRipple = sin(length(position) * 12.0 - uTime * 30.0) * shockwave * 0.4;
      float impactScale = shockwave * 1.2; // Sudden violent expansion
      
      // ── FINAL DEFORMATION ───────────────────────────────────────────
      float totalDeform = baseDeform + hoverDeform + vibNoise + crack + impactRipple;
      vec3 newPosition = position + normal * totalDeform;
      
      // Apply compression and impact scaling uniformly
      newPosition *= (1.0 + compression + impactScale);
      
      // ── DISPERSAL SCATTER ───────────────────────────────────────────
      float dNoise    = cnoise(position * 2.5 + uTime * 0.4) * 0.5 + 0.5;
      float dNoise2   = cnoise(position * 4.0 - uTime * 0.2);
      
      // Cinematic outward propulsion that slows down over time
      // Use a pow curve so it bursts fast then drifts
      float burstForce = pow(disperse, 0.4); 
      
      float radialPush = burstForce * dNoise * 4.5;
      float driftAmt   = disperse * dNoise2 * 1.2;
      
      newPosition += normal * radialPush;
      newPosition += vec3(dNoise2 * 0.5, dNoise * 0.4, dNoise2 * 0.6) * driftAmt;
      newPosition *= (1.0 + burstForce * 1.5); 
      
      vPosition = newPosition;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `;


  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uScroll;
    
    // Reinhard tonemapping
    vec3 tonemap(vec3 c) {
      return c / (c + vec3(1.0));
    }
    
    void main() {
      // ── COLOR NARRATIVE ─────────────────────────────────────────────
      vec3 cStable = vec3(0.42, 0.22, 0.95); // deep purple
      vec3 cTension = vec3(0.95, 0.20, 0.30); // intense red/violet heat as it compresses
      vec3 cShock = vec3(1.0, 1.0, 1.0);     // blinding white/cyan impact
      vec3 cDisperse = vec3(0.35, 0.82, 0.95); // ambient silver-cyan
      
      float tension   = smoothstep(0.15, 0.38, uScroll) * (1.0 - smoothstep(0.38, 0.42, uScroll));
      float shockwave = smoothstep(0.38, 0.45, uScroll) * (1.0 - smoothstep(0.45, 0.55, uScroll));
      float disperse  = smoothstep(0.42, 0.85, uScroll);
      
      vec3 coreColor = cStable;
      coreColor = mix(coreColor, cTension, tension);
      coreColor = mix(coreColor, cShock, shockwave);
      coreColor = mix(coreColor, cDisperse, disperse);
      
      // ── FRESNEL ─────────────────────────────────────────────────────
      vec3 viewDir = normalize(cameraPosition - vPosition);
      float NdotV  = clamp(dot(normalize(vNormal), viewDir), 0.0, 1.0);
      float fPow   = mix(4.0, 1.0, disperse + shockwave); // Flattens completely during shockwave
      float fresnel = pow(1.0 - NdotV, fPow);
      
      // ── SURFACE FLOW ────────────────────────────────────────────────
      float flow  = sin(vUv.y * 12.0 + uTime * 1.2) * 0.5 + 0.5;
      float bands = sin(vUv.y * 40.0 + uTime * 5.0) * 0.5 + 0.5;
      float surface = mix(flow, bands, tension);
      
      // ── BRIGHTNESS & IMPACT ─────────────────────────────────────────
      float baseIntensity = 1.0 + fresnel * 0.6 + surface * 0.2;
      
      // Massive intensity spike during shockwave
      float impactIntensity = shockwave * 8.0; 
      
      float intensity = baseIntensity + impactIntensity;
      
      // Raise the tonemap cap during shockwave so it truly flashes bright
      intensity = min(intensity, 4.0); 
      
      vec3 finalColor = coreColor * intensity;
      
      // Cinematic Chromatic Aberration during shockwave
      finalColor.r += shockwave * 0.5 * fresnel;
      finalColor.b += shockwave * 0.8 * fresnel;
      
      finalColor = tonemap(finalColor);
      
      // ── ALPHA ───────────────────────────────────────────────────────
      float alphaBase  = fresnel + surface * 0.15 + shockwave; 
      float alphaDecay = 1.0 - smoothstep(0.60, 1.0, uScroll) * 0.7;
      
      gl_FragColor = vec4(finalColor, min(alphaBase * alphaDecay, 1.0));
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uScroll: { value: 0 },
    }),
    []
  );

  const pulseRef = useRef(0);

  useEffect(() => {
    const handlePulse = () => {
      pulseRef.current = 1.8; // Massive deformation spike
    };
    window.addEventListener("cinematic-enter", handlePulse);
    return () => window.removeEventListener("cinematic-enter", handlePulse);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Get current scroll value from Framer Motion
      const scrollVal = scrollYProgress.get();
      materialRef.current.uniforms.uScroll.value = scrollVal;

      // Decay the click pulse
      pulseRef.current = THREE.MathUtils.lerp(pulseRef.current, 0, 0.06);

      // Mouse proximity intelligence + cinematic click pulse
      const baseHover = mouse.length() > 0 ? clamp(1.0 - mouse.length(), 0.0, 1.0) : 0.0;
      const targetHover = baseHover + pulseRef.current;
      
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        targetHover,
        0.05
      );
    }

    // Camera perspective sway
    const targetX = (mouse.x * 0.1);
    const targetY = (mouse.y * 0.1);
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {/* Optimized Neural Core Geometry */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          uniforms={uniforms}
          wireframe={false}
        />
      </mesh>
    </group>
  );
}

function AtmosphericParticles({ count, depth, colorStart, colorEnd, scrollYProgress }: { count: number, depth: number, colorStart: string, colorEnd: string, scrollYProgress: any }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, camera } = useThree();

  const cStart = new THREE.Color(colorStart);
  const cEnd = new THREE.Color(colorEnd);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a volumetric cylinder
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth;
      
      // Start color
      col[i * 3] = cStart.r;
      col[i * 3 + 1] = cStart.g;
      col[i * 3 + 2] = cStart.b;
    }
    return [pos, col];
  }, [count, depth, colorStart]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scrollVal = scrollYProgress.get();
    
    // Interpolate colors based on scroll
    const evolve = THREE.MathUtils.clamp((scrollVal - 0.2) / 0.2, 0, 1);
    const currentColor = cStart.clone().lerp(cEnd, evolve);
    
    if (pointsRef.current) {
      const colorAttribute = pointsRef.current.geometry.attributes.color;
      for (let i = 0; i < count; i++) {
        colorAttribute.setXYZ(i, currentColor.r, currentColor.g, currentColor.b);
      }
      colorAttribute.needsUpdate = true;
      
      // Phase calculations matching the shaders
      const tension = THREE.MathUtils.clamp((scrollVal - 0.15) / 0.23, 0, 1) * (1.0 - THREE.MathUtils.clamp((scrollVal - 0.38) / 0.04, 0, 1));
      const shockwave = THREE.MathUtils.clamp((scrollVal - 0.38) / 0.07, 0, 1) * (1.0 - THREE.MathUtils.clamp((scrollVal - 0.45) / 0.10, 0, 1));
      const disperse = THREE.MathUtils.clamp((scrollVal - 0.42) / 0.43, 0, 1);
      
      // Speed multiplier: 
      // Fast swirling during tension, MASSIVE during shockwave, extremely slow/calm post-explosion
      let speedMult = 1.0;
      if (tension > 0) speedMult = 1.0 + tension * 8.0;
      if (shockwave > 0) speedMult = 1.0 + shockwave * 25.0;
      if (disperse > 0) speedMult = THREE.MathUtils.lerp(speedMult, 0.15, disperse); // Calms down dramatically
      
      pointsRef.current.rotation.y = time * 0.05 * speedMult;
      pointsRef.current.rotation.x = time * 0.02 * speedMult;
      
      // Parallax interaction
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * (depth * 0.05), 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * (depth * 0.05), 0.05);
      
      // Scale dynamic: Suck inward during tension -> Burst violently -> Expand and drift
      let scale = 1.0;
      if (tension > 0) scale -= tension * 0.4; // Pull inward 40%
      if (shockwave > 0) scale += shockwave * 3.5; // Blast outward 3.5x
      if (disperse > 0) scale = THREE.MathUtils.lerp(scale, 1.0 + disperse * 2.5, disperse); // Drift out smoothly
      
      pointsRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors={true}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Cinematic post-processing component driving the visual audio impact
function DynamicEffects({ scrollYProgress }: { scrollYProgress: any }) {
  const bloomRef = useRef<any>(null);
  const pulseRef = useRef(0);

  useEffect(() => {
    const handlePulse = () => {
      pulseRef.current = 2.5; // Massive bloom spike on click
    };
    window.addEventListener("cinematic-enter", handlePulse);
    return () => window.removeEventListener("cinematic-enter", handlePulse);
  }, []);

  useFrame(() => {
    const scrollVal = scrollYProgress.get();
    
    // Decay click pulse
    pulseRef.current = THREE.MathUtils.lerp(pulseRef.current, 0, 0.08);
    
    // Bloom intensity curve matching the emotional pacing:
    // Base 0.9 -> Tension (1.8) -> Shockwave Flash (3.5) -> Post-Explosion Clean (0.2)
    let targetIntensity = 0.9;
    if (scrollVal > 0.30 && scrollVal < 0.38) {
      targetIntensity = THREE.MathUtils.lerp(0.9, 1.8, (scrollVal - 0.3) / 0.08); // Build pressure
    } else if (scrollVal >= 0.38 && scrollVal < 0.45) {
      targetIntensity = THREE.MathUtils.lerp(1.8, 3.5, (scrollVal - 0.38) / 0.07); // Massive flash
    } else if (scrollVal >= 0.45 && scrollVal < 0.6) {
      targetIntensity = THREE.MathUtils.lerp(3.5, 0.2, (scrollVal - 0.45) / 0.15); // Quick decay
    } else if (scrollVal >= 0.6) {
      targetIntensity = 0.2; // Pristine, sharp post-explosion environment
    }

    if (bloomRef.current) {
      bloomRef.current.intensity = targetIntensity + pulseRef.current;
    }
  });

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom 
        ref={bloomRef}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        intensity={0.9}
      />
      <Noise opacity={0.02} />
    </EffectComposer>
  );
}

export function AIOrb() {
  const { scrollYProgress } = useScroll();
  
  // Background gradient color transition (Cinematic pulse during shockwave)
  const bgR = useTransform(scrollYProgress, [0.0, 0.35, 0.40, 0.6], [10, 5, 25, 4]);
  const bgG = useTransform(scrollYProgress, [0.0, 0.35, 0.40, 0.6], [10, 2, 50, 12]);
  const bgB = useTransform(scrollYProgress, [0.0, 0.35, 0.40, 0.6], [20, 10, 75, 22]);

  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none origin-center"
      style={{
        backgroundColor: useTransform(() => `rgb(${bgR.get()}, ${bgG.get()}, ${bgB.get()})`)
      }}
    >
      {/* Dynamic ambient gradient that shifts with scroll */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{
          background: useTransform(scrollYProgress, 
            [0, 0.40, 0.5], 
            [
              "radial-gradient(circle at 50% 50%, rgba(138, 92, 255, 0.15) 0%, rgba(0, 0, 0, 0) 60%)",
              "radial-gradient(circle at 50% 50%, rgba(100, 200, 255, 0.4) 0%, rgba(0, 0, 0, 0) 80%)",
              "radial-gradient(circle at 50% -20%, rgba(100, 180, 255, 0.05) 0%, rgba(0, 0, 0, 0) 60%)"
            ]
          ),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.40, 0.5], [1, 1, 1.5, 0.5])
        }}
      />

      {/* Reduced device pixel ratio cap for performance */}
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.5} />
        
        {/* Deep background atmosphere — always present */}
        <AtmosphericParticles count={200} depth={60} colorStart="#1a0840" colorEnd="#0a1a40" scrollYProgress={scrollYProgress} />
        {/* Mid-field energy layer — evolves with explosion */}
        <AtmosphericParticles count={100} depth={20} colorStart="#6020ff" colorEnd="#2080ff" scrollYProgress={scrollYProgress} />
        {/* Neural core — cinematic lead actor */}
        <NeuralOrbMesh scrollYProgress={scrollYProgress} />
        {/* Foreground scatter layer — reacts most dramatically to dispersal */}
        <AtmosphericParticles count={80} depth={6} colorStart="#9a6cff" colorEnd="#80d0ff" scrollYProgress={scrollYProgress} />
        
        <DynamicEffects scrollYProgress={scrollYProgress} />
      </Canvas>
    </motion.div>
  );
}
