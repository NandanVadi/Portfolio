import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nandan Vadi | Creative Developer & AI Engineer",
  description: "Cinematic portfolio of Nandan Vadi, building futuristic interactive digital experiences using AI, full-stack engineering, and cinematic frontend design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark antialiased cursor-none`}
    >
      <body className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30 selection:text-white relative">
        {/* Cinematic noise overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <CustomCursor />
        
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
