import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Competitive } from "@/components/competitive";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { AIOrb } from "@/components/ai-orb";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      {/* Layer 0: Fixed energy system — orb, explosion, atmosphere */}
      <AIOrb />

      {/* Layer 1: UI content — floats above the energy field */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Competitive />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
