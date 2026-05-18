"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Cpu, Layers, Zap } from "lucide-react";

const highlights = [
  {
    icon: <Cpu className="w-5 h-5" />,
    label: "LLM Integration",
    detail: "Groq API + Llama 3",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    label: "Full Stack",
    detail: "Next.js + Django REST",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Real-time",
    detail: "Streaming inference",
  },
];

export function InteractivePromptDemo() {
  return (
    <section className="py-56 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="text-primary text-sm font-medium mb-6 uppercase tracking-[0.3em] font-mono flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-primary" />
            04 — Featured Intelligence
            <span className="w-12 h-[1px] bg-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 drop-shadow-xl tracking-tight">
            Prompt Enhancement{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">
              Studio
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light font-[family-name:var(--font-inter)]">
            An AI-powered intelligence engine that transforms raw ideas into
            richly detailed, cinematic prompts — built with Groq, Llama 3, and
            a full-stack pipeline.
          </p>
        </motion.div>

        {/* Cinematic showcase card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Restrained ambient glow */}
          <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="glass-panel rounded-[2.5rem] overflow-hidden relative">
            {/* Top bar */}
            <div className="flex items-center gap-3 px-8 py-5 border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <div className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
              <div className="text-xs font-mono text-muted-foreground ml-2 flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" />
                prompt-enhancement-studio.vercel.app
              </div>
            </div>

            {/* Main visual area */}
            <div className="relative p-10 md:p-14 flex flex-col md:flex-row gap-12 items-center">
              {/* Left — concept display */}
              <div className="flex-1 space-y-6">
                <div className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-2">
                  Input
                </div>
                <div className="glass-panel rounded-2xl p-5 text-muted-foreground text-lg font-light font-[family-name:var(--font-inter)] border-white/5">
                  cyberpunk city at night
                </div>

                {/* Animated transform indicator */}
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.95, 1, 0.95] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  <Sparkles className="w-4 h-4 text-primary" />
                  <div className="flex-1 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                </motion.div>

                <div className="text-xs font-mono text-primary/60 uppercase tracking-widest mb-2">
                  Intelligence Output
                </div>
                <div className="glass-panel rounded-2xl p-5 text-foreground/90 text-base font-light font-[family-name:var(--font-inter)] leading-relaxed border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  A cinematic, ultra-realistic cyberpunk city alleyway at night,
                  neon reflections on wet pavement, volumetric fog, moody
                  atmospheric lighting, shot on anamorphic lens, 8k resolution,
                  photorealistic, cinematic composition.
                </div>
              </div>

              {/* Right — stats */}
              <div className="flex flex-col gap-4 w-full md:w-48">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.7 }}
                    className="glass-panel p-5 rounded-2xl flex flex-col gap-2 hover:border-primary/30 transition-colors duration-300"
                  >
                    <div className="text-primary">{h.icon}</div>
                    <div className="text-sm font-semibold text-foreground font-[family-name:var(--font-space-grotesk)]">
                      {h.label}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {h.detail}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-10 md:px-14 pb-10 flex items-center gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
              >
                View Case Study <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-white/10">|</span>
              <a
                href="https://github.com/NandanVadi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Source Code
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
