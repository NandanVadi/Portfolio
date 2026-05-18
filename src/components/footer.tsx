import { FaGithub, FaLinkedin } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-md relative z-10">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground mb-2">
            Nandan Vadi
          </h2>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} All rights reserved. Building the future.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://github.com/NandanVadi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <FaGithub className="w-5 h-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://linkedin.com/in/nandan-vadi-a967ab31b" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <FaLinkedin className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
