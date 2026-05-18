"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// ── Premium Typewriter — character-by-character with cinematic timing ──────
function CinematicTypewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    // Slightly variable timing per character — feels intelligent, not mechanical
    function typeNext() {
      if (i >= text.length) {
        setDone(true);
        return;
      }
      setDisplayed(text.slice(0, i + 1));
      i++;
      // Pause slightly at spaces and after punctuation for natural pacing
      const ch = text[i - 1];
      const pause = ch === " " ? 60 : ch === "." ? 220 : 75 + Math.random() * 30;
      setTimeout(typeNext, pause);
    }
    typeNext();
  }, [started, text]);

  // Cursor blink stops once done (clean final state)
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, [done]);

  return (
    <span className="relative">
      {displayed}
      {/* Cinematic cursor — subtle glow dot, not a blinking bar */}
      <motion.span
        animate={{ opacity: done ? 0 : cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle rounded-sm shadow-[0_0_8px_rgba(120,60,255,0.8)]"
      />
    </span>
  );
}

export function Hero() {
  const [showTerminal, setShowTerminal] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [loadingPhase, setLoadingPhase] = useState(0);
  const loadingTexts = [
    "Initializing Neural Systems...",
    "Calibrating Spatial Interface...",
    "Loading Intelligence Core...",
    "Rendering Environment...",
    "System Online.",
  ];

  useEffect(() => {
    let currentPhase = 0;
    const maxPhases = loadingTexts.length;
    const phaseDuration = 3500 / maxPhases;

    const interval = setInterval(() => {
      currentPhase++;
      if (currentPhase < maxPhases) {
        setLoadingPhase(currentPhase);
      } else {
        clearInterval(interval);
        setTimeout(() => setShowTerminal(false), 500);
      }
    }, phaseDuration);

    return () => clearInterval(interval);
  }, []);

  // Typewriter starts after the boot overlay fades (~4.5s delay + fade)
  const typewriterDelay = 5.2;

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Atmospheric grid */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_50%,transparent_100%)] pointer-events-none"
      />

      {/* ── Cinematic Boot Sequence ───────────────────────────────────────── */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/10 rounded-full mix-blend-screen pointer-events-none"
            />

            <div className="relative flex flex-col items-center justify-center w-full max-w-2xl px-6">
              {/* Progress ring */}
              <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <motion.circle
                    cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1"
                    className="text-primary"
                    initial={{ strokeDasharray: "301", strokeDashoffset: "301" }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  />
                </svg>
                <motion.div
                  animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-primary rounded-full box-glow"
                />
              </div>

              <div className="h-8 relative w-full flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={loadingPhase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute text-sm md:text-base font-mono text-primary/80 uppercase tracking-[0.3em] text-center"
                  >
                    {loadingTexts[loadingPhase]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-10 left-10 text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest hidden md:block">
                SYS_ID: NDN-8942<br />CORE: ACTIVE<br />RENDER: WEBGL2
              </div>
              <div className="absolute bottom-10 right-10 text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest hidden md:block text-right">
                ENV: SPATIAL<br />LIGHTING: DYNAMIC<br />MEM: ALLOCATED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Hero Content ─────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="text-center relative z-10 w-full px-4 max-w-5xl mx-auto"
      >
        {/* Volumetric backdrop for text separation */}
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] -z-10 rounded-full scale-[2] mix-blend-overlay [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 4.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">Neural Systems Online</span>
          </div>
        </motion.div>

        {/* ── Name — cinematic typewriter reveal ──────────────────────────── */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: typewriterDelay - 0.1 }}
          className="text-6xl md:text-8xl lg:text-[9.5rem] font-bold tracking-tighter font-[family-name:var(--font-space-grotesk)] mb-6 leading-[0.95] drop-shadow-2xl relative"
        >
          {/* Soft glow halo behind name */}
          <span className="absolute inset-0 opacity-15 text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300 pointer-events-none transform scale-105 blur-xl select-none" aria-hidden>
            Nandan Vadi
          </span>
          {/* Typewriter text — first name plain, last name gradient */}
          <span className="text-foreground">
            <CinematicTypewriter text="Nandan " delay={typewriterDelay} />
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-indigo-300">
            <CinematicTypewriter text="Vadi" delay={typewriterDelay + 0.62} />
          </span>
        </motion.h1>

        {/* ── Subtitle & Freelance Status ─────────────────────────────────── */}
        <div className="flex flex-col items-center gap-8 mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: typewriterDelay + 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto font-[family-name:var(--font-inter)] leading-relaxed font-light drop-shadow-md"
          >
            Building{" "}
            <span className="text-foreground font-medium">intelligent digital experiences</span>
            {" "}with AI, interaction, and modern frontend systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: typewriterDelay + 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.02)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-sm font-[family-name:var(--font-inter)] text-muted-foreground/80 font-light">
              Available for select freelance collaborations
            </span>
          </motion.div>
        </div>

      </motion.div>

      {/* ── Cinematic Bottom Interaction Area ────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: typewriterDelay + 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[340px] flex items-center justify-between z-20"
      >
        {/* GitHub */}
        <a
          href="https://github.com/NandanVadi"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-700 hover:shadow-[0_0_20px_rgba(120,60,255,0.15)]"
        >
          <FaGithub className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors duration-500" />
          <span className="sr-only">GitHub</span>
        </a>

        {/* Calm Descend Indicator */}
        <div className="flex flex-col items-center gap-3 translate-y-6">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground/50 font-mono select-none">
            Descend
          </span>
          <div className="relative h-16 w-px bg-white/[0.03] overflow-hidden rounded-full">
            <motion.div
              animate={{
                y: ["-100%", "200%"],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.2, 1], // smooth gravity acceleration
                repeatDelay: 1.0,
              }}
              className="absolute inset-0 h-1/2 w-full bg-gradient-to-b from-transparent via-primary/60 to-transparent"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/nandan-vadi-a967ab31b"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.02] border border-white/5 backdrop-blur-md hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-700 hover:shadow-[0_0_20px_rgba(120,60,255,0.15)]"
        >
          <FaLinkedin className="w-5 h-5 text-muted-foreground/60 group-hover:text-primary transition-colors duration-500" />
          <span className="sr-only">LinkedIn</span>
        </a>
      </motion.div>
    </section>
  );
}
