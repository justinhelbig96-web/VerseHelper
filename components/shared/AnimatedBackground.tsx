"use client";

import { motion } from "framer-motion";

/**
 * Full-page animated background:
 * — Hero-grid dot pattern
 * — Three floating gradient orbs with looping motion
 * — Bottom vignette
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grid pattern */}
      <div className="absolute inset-0 hero-grid opacity-60" />

      {/* Orb 1 — purple, top-left */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          top: "-15%",
          left: "-10%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* Orb 2 — blue, bottom-right */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-8%",
        }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Orb 3 — cyan, centre */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
          top: "40%",
          left: "45%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          x: [0, 80, -60, 20, 0],
          y: [0, -60, 40, -20, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 6,
        }}
      />

      {/* Bottom fade vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background:
            "linear-gradient(to top, #050508, transparent)",
        }}
      />
    </div>
  );
}
