"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, BrainCircuit } from "lucide-react";

export function Competitive() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-bottom-left z-0" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4 drop-shadow-xl">
            Algorithmic <span className="text-primary">Core</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Problem solving is at the heart of engineering. I actively participate in competitive programming to keep my algorithmic thinking sharp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            icon={<Terminal />}
            platform="LeetCode"
            stat="Problem Solving"
            link="https://leetcode.com/u/nandanvadi/"
            delay={0.1}
          />
          <StatCard 
            icon={<Code2 />}
            platform="HackerRank"
            stat="Algorithms"
            link="https://www.hackerrank.com/profile/nandanvadi"
            delay={0.2}
          />
          <StatCard 
            icon={<BrainCircuit />}
            platform="Codeforces/CodeChef"
            stat="Competitive Coding"
            link="#"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, platform, stat, link, delay }: { icon: React.ReactNode, platform: string, stat: string, link: string, delay: number }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="glass-panel p-6 rounded-[2rem] flex items-center gap-4 group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <div className="text-sm text-muted-foreground font-mono mb-1">{platform}</div>
        <div className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground group-hover:text-primary transition-colors">
          {stat}
        </div>
      </div>
    </motion.a>
  );
}
