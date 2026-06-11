"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send, Mail, MapPin } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 relative z-10"
        >
          <div className="text-primary text-sm font-medium mb-6 uppercase tracking-[0.3em] font-mono flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-primary"></span>
            05 — Connect
            <span className="w-12 h-[1px] bg-primary"></span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-space-grotesk)] mb-6 drop-shadow-xl tracking-tight">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Connection</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light font-[family-name:var(--font-inter)] leading-relaxed">
            {"Open to select freelance collaborations. Whether it's AI integration or a modern web experience, let's build something extraordinary."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-8 relative group"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-xl group-hover:bg-primary/10 transition-colors duration-500 -z-10" />
            <div className="glass-panel p-10 rounded-[2rem] h-full flex flex-col justify-center gap-12 border-white/5 hover:border-primary/30 transition-colors duration-500">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  </span>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground/90">Available for Collaboration</h3>
                </div>
                <div className="space-y-6">
                  <a href="mailto:nandanvadi@gmail.com" className="flex items-center gap-6 text-muted-foreground hover:text-primary transition-all duration-300 group/link">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-primary/20 transition-colors duration-300 group-hover/link:scale-110">
                      <Mail className="w-5 h-5 text-foreground group-hover/link:text-primary" />
                    </div>
                    <span className="font-medium text-xl font-[family-name:var(--font-inter)]">nandanvadi@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-6 text-muted-foreground group/link">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-primary/20 transition-colors duration-300">
                      <MapPin className="w-5 h-5 text-foreground group-hover/link:text-primary" />
                    </div>
                    <span className="font-medium text-xl font-[family-name:var(--font-inter)] group-hover/link:text-primary transition-colors duration-300">India</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm md:text-base text-muted-foreground font-light font-[family-name:var(--font-inter)] leading-relaxed">
                  Partnering with forward-thinking teams and individuals to engineer premium digital products.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="glass-panel p-10 rounded-[2rem] border-white/5 hover:border-primary/30 transition-colors duration-500 flex flex-col gap-8 relative"
            onSubmit={handleSubmit}
          >
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground pl-1 uppercase tracking-widest font-mono">Name</label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="bg-background/80 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all h-14 text-lg rounded-xl" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground pl-1 uppercase tracking-widest font-mono">Email</label>
              <Input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="bg-background/80 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all h-14 text-lg rounded-xl" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground pl-1 uppercase tracking-widest font-mono">Message</label>
              <Textarea 
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                className="bg-background/80 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all min-h-[160px] text-lg rounded-xl resize-none" 
              />
            </div>
            <Button 
              type="submit"
              disabled={status === "loading"}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground box-glow group mt-4 text-lg rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === "loading" ? "Transmitting..." : status === "success" ? "Transmission Sent!" : "Send Transmission"}
              {status === "idle" && <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
            </Button>
            {status === "success" && (
              <p className="text-emerald-400 text-center text-sm font-medium mt-[-1rem]">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm font-medium mt-[-1rem]">Failed to send message. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
