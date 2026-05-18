"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend Engineering",
    skills: ["React", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js"],
  },
  {
    title: "Backend & AI",
    skills: ["Python", "Django", "Node.js", "Llama 3", "Groq API", "REST APIs", "SQL"],
  },
  {
    title: "Core & Tools",
    skills: ["C/C++", "Java", "Data Structures", "Algorithms", "Git", "Vercel", "Figma"],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 relative z-10"
        >
          <div className="text-primary text-sm font-medium mb-6 uppercase tracking-[0.3em] font-mono flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary"></span>
            03 — Arsenal
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Capabilities</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                className="glass-panel p-8 rounded-[2rem] hover:border-primary/30 transition-colors duration-300"
              >
              <h3 className="text-2xl font-bold text-foreground mb-8 font-[family-name:var(--font-space-grotesk)] border-b border-white/10 pb-4 group-hover:border-primary/30 transition-colors duration-500">
                {category.title}
              </h3>
              <ul className="space-y-5">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-4 text-muted-foreground group/skill">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover/skill:bg-primary group-hover/skill:scale-150 transition-all duration-300 group-hover/skill:box-glow" />
                    <span className="group-hover/skill:text-primary transition-colors duration-300 font-[family-name:var(--font-inter)] text-lg">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
