"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorXOuter = useSpring(0, { stiffness: 150, damping: 20 });
  const cursorYOuter = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorXOuter.set(e.clientX - 16);
      cursorYOuter.set(e.clientY - 16);
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');
        
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, [cursorX, cursorY, cursorXOuter, cursorYOuter]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[100] mix-blend-screen hidden md:block"
        style={{
          x: cursorXOuter,
          y: cursorYOuter,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.2 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[100] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
