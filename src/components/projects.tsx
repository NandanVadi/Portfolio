"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "Prompt Enhancement Studio",
    description: "AI-powered cinematic prompt engineering platform using Groq API + Llama 3.",
    image: "/projects/prompt-studio.png",
    stack: ["Next.js", "Django", "Llama 3", "Groq API", "Tailwind"],
    featured: true,
  },
  {
    title: "TrustWeave",
    description: "Explainable fintech trust/risk intelligence system.",
    image: "/projects/trustweave.png",
    stack: ["React", "TypeScript", "Deterministic Logic", "UI/UX"],
  },
  {
    title: "TypeRush",
    description: "Gamified neon-inspired typing challenge web app.",
    image: "/projects/typerush.png",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3", "Events"],
  },
  {
    title: "Library Management",
    description: "Clean, responsive library showcase interface.",
    image: "/projects/library.jpg",
    stack: ["HTML", "CSS", "Responsive Design"],
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 relative z-10"
        >
          <div className="text-primary text-sm font-medium mb-6 uppercase tracking-[0.3em] font-mono flex items-center gap-4">
            <span className="w-12 h-[1px] bg-primary"></span>
            02 — Selected Works
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 drop-shadow-xl tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Work</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl font-light font-[family-name:var(--font-inter)]">
            A selection of projects that fuse AI capabilities with premium user interfaces, designed to solve problems elegantly.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax strictly on the image module, not the whole card
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.5, 1, 1, 0.5]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      className="group relative w-full glass-panel rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-white/5 hover:border-primary/20 transition-all duration-700 overflow-hidden"
    >
      {/* Background ambient glow inside the module */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center relative z-10`}>

        {/* ── Text Content ─────────────────────────────────────────────────── */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          {project.featured && (
            <div className="text-primary text-xs font-medium mb-5 uppercase tracking-[0.2em] font-mono flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-[pulse_3s_ease-in-out_infinite] shadow-[0_0_8px_rgba(120,60,255,0.8)]" />
              Featured Intelligence
            </div>
          )}

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-[family-name:var(--font-space-grotesk)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary/60 transition-all duration-500 tracking-tight leading-[1.1]">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed font-light font-[family-name:var(--font-inter)] max-w-lg">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-12">
            {project.stack.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="bg-white/5 hover:bg-primary/20 text-foreground/80 border-white/5 hover:border-primary/30 transition-all duration-300 font-medium px-4 py-1.5 rounded-full text-xs md:text-sm">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-8 mt-auto">
            <a href="#" className="flex items-center gap-2 text-primary hover:text-white transition-colors font-medium text-sm tracking-wide uppercase font-mono group/link">
              Inspect System
              <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </a>
            <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors font-medium text-sm tracking-wide uppercase font-mono">
              <FaGithub className="w-4 h-4" /> Source
            </a>
          </div>
        </div>

        {/* ── Image Presentation ─────────────────────────────────────────── */}
        <div className="w-full lg:w-1/2 relative pt-6 lg:pt-0">
          <motion.div
            style={{ y }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.5)] group-hover:border-primary/30 group-hover:shadow-[0_0_80px_rgba(120,60,255,0.15)] transition-all duration-1000 group-hover:scale-[1.02]"
          >
            {/* Cinematic App Window Frame */}
            <div className="w-full h-10 bg-white/[0.03] border-b border-white/5 flex items-center px-4 gap-2 backdrop-blur-md absolute top-0 left-0 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>

            {/* Non-destructive Image Container */}
            <div className="relative w-full aspect-[16/10] mt-10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top opacity-75 group-hover:opacity-100 transition-opacity duration-1000"
              />
            </div>

            {/* Depth & Lighting Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
