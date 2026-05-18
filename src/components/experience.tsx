"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const phases = [
  {
    id: "PHASE_01",
    state: "SYSTEM ORIGIN",
    label: "First Contact",
    description:
      "The beginning wasn't a job. It was a browser DevTools panel and a question: what makes this move? Started pulling interfaces apart to understand how they were built — HTML, CSS, JavaScript. The first dopamine hit of seeing something appear on screen because I wrote it.",
    capabilities: ["HTML", "CSS", "JavaScript", "Logic Systems", "Browser APIs"],
    intensity: 1,
  },
  {
    id: "PHASE_02",
    state: "INTERFACE DISCOVERY",
    label: "Visual Thinking",
    description:
      "Became obsessed with how things feel, not just how they work. Discovered that the space between interactions — the timing, the easing, the visual weight — matters as much as the function. Built TypeRush: a gamified typing experience that let me explore real-time feedback loops and aesthetic decisions simultaneously.",
    capabilities: ["UI/UX Design", "Event Systems", "Canvas API", "Visual Rhythm", "User Psychology"],
    intensity: 2,
  },
  {
    id: "PHASE_03",
    state: "MOTION SYSTEMS",
    label: "Things in Motion",
    description:
      "Animation stopped being decoration and became architecture. Learned how motion communicates state, guides attention, and creates emotional responses. Went deep into GSAP, Framer Motion, and scroll-driven orchestration — realizing that a well-timed transition is a design decision, not an afterthought.",
    capabilities: ["GSAP", "Framer Motion", "Scroll Choreography", "React", "Three.js"],
    intensity: 3,
  },
  {
    id: "PHASE_04",
    state: "INTELLIGENCE LAYER",
    label: "AI Integration",
    description:
      "Large language models changed what was possible. Built Prompt Enhancement Studio — a real-time AI inference system using Groq and Llama 3 — and understood that the interface around intelligence matters as much as the intelligence itself. The frontend became a lens through which AI makes sense to humans.",
    capabilities: ["LLM Integration", "Groq API", "Llama 3", "Django REST", "Next.js 15"],
    intensity: 4,
  },
  {
    id: "PHASE_05",
    state: "CURRENT EVOLUTION",
    label: "Creative Engineering",
    description:
      "Building at the intersection of AI systems, cinematic interfaces, and spatial interaction. Studying computer engineering to understand the systems beneath the surface. The goal: create digital experiences that feel intelligent — not because they announce it, but because every interaction is considered.",
    capabilities: ["WebGL / GLSL", "Spatial UI", "Systems Thinking", "TypeScript", "Creative Direction"],
    intensity: 5,
    active: true,
  },
];

// Intensity bars showing capability level at each phase
function IntensityBar({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`w-5 h-1 rounded-full origin-left ${
            i < level
              ? "bg-gradient-to-r from-primary to-indigo-400"
              : "bg-white/10"
          }`}
        />
      ))}
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="py-40 relative overflow-hidden">
      {/* Subtle directional field */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,60,255,0.8) 1px, transparent 1px), linear-gradient(to right, rgba(120,60,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #000 20%, #000 80%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Ambient corner glows */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 relative z-10"
        >
          <div className="text-primary text-sm font-medium mb-6 uppercase tracking-[0.3em] font-mono flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary" />
            04 — System Evolution
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] drop-shadow-xl tracking-tight leading-none">
              How I{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
                Evolved
              </span>
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-sm self-start md:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                5 phases · system active
              </span>
            </div>
          </div>
        </motion.div>

        {/* Phase cards */}
        <div className="space-y-6">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: index * 0.08,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative"
            >
              <div
                className={`glass-panel rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-primary/20 ${
                  phase.active ? "border-primary/15" : ""
                }`}
              >
                {/* Top accent — bright for active, subtle for past */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[1px] transition-all duration-700 ${
                    phase.active
                      ? "bg-gradient-to-r from-primary via-violet-400 to-indigo-400/50"
                      : "bg-gradient-to-r from-white/8 via-white/4 to-transparent group-hover:from-primary/30 group-hover:via-primary/15"
                  }`}
                />

                <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">

                  {/* Left column — Phase identifier */}
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3 md:pt-1 md:min-w-[7rem]">
                    {/* Phase ID */}
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40">
                      {phase.id}
                    </div>

                    {/* Large phase number — decorative */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + 0.2, duration: 0.6 }}
                      className="text-[4rem] md:text-[5rem] font-bold font-[family-name:var(--font-space-grotesk)] leading-none select-none"
                      style={{
                        background: phase.active
                          ? "linear-gradient(135deg, rgba(120,60,255,0.5), rgba(100,140,255,0.3))"
                          : "rgba(255,255,255,0.06)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.div>

                    {/* Intensity system */}
                    <div className="hidden md:block">
                      <div className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest mb-2">
                        Depth
                      </div>
                      <IntensityBar level={phase.intensity} />
                    </div>
                  </div>

                  {/* Right column — Content */}
                  <div>
                    {/* Phase state label */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={`text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                          phase.active
                            ? "border-primary/30 text-primary bg-primary/8"
                            : "border-white/10 text-muted-foreground/50 bg-white/[0.02]"
                        }`}
                      >
                        {phase.active ? "● " : ""}{phase.state}
                      </span>
                      {phase.active && (
                        <span className="text-xs font-mono text-primary/60 uppercase tracking-widest animate-pulse">
                          current
                        </span>
                      )}
                    </div>

                    {/* Phase name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-space-grotesk)] mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/60 transition-all duration-500">
                      {phase.label}
                    </h3>

                    {/* Divider */}
                    <div className="w-12 h-px bg-gradient-to-r from-primary/40 to-transparent mb-5 group-hover:w-24 transition-all duration-500" />

                    {/* Description */}
                    <p className="text-muted-foreground/75 leading-relaxed font-[family-name:var(--font-inter)] text-base md:text-lg font-light mb-7">
                      {phase.description}
                    </p>

                    {/* Capabilities */}
                    <div>
                      <div className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest mb-3">
                        Capabilities active
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="px-3 py-1 rounded-full text-xs font-mono text-muted-foreground/60 bg-white/[0.04] border border-white/[0.06] hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* System status footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-16 flex items-center gap-6 pl-2"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-primary/20 to-transparent" />
          <span className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-[0.3em]">
            Evolution ongoing · next phase unknown
          </span>
        </motion.div>
      </div>
    </section>
  );
}
