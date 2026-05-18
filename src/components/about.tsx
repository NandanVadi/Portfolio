"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="text-primary text-sm font-medium mb-6 uppercase tracking-[0.3em] font-mono flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary"></span>
            01 — Identity
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] mb-12 inline-block leading-tight drop-shadow-xl relative z-10">
            Intelligence,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Designed.</span>
          </h2>
          
          <div className="glass-panel p-8 md:p-12 rounded-3xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg md:text-xl text-muted-foreground font-[family-name:var(--font-inter)] leading-relaxed font-light relative z-10">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-foreground first-letter:mr-2 first-letter:float-left">
                I bridge the gap between complex AI logic and stunning human interfaces. As a Full Stack & AI Developer, my focus is on crafting digital experiences that aren't just functional, but genuinely memorable.
              </p>
              <p>
                My approach blends cinematic frontend design with robust full-stack engineering, creating modern, intelligent applications that stand out in today's fast-paced digital ecosystem.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
