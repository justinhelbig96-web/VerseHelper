"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISCORD_ICON = (
  <svg className="w-5 h-5" viewBox="0 0 71 55" fill="currentColor" aria-hidden>
    <path d="M60.1 4.9A58.5 58.5 0 0 0 45.6.6a.22.22 0 0 0-.23.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0 37.4 37.4 0 0 0-1.82-3.7.23.23 0 0 0-.23-.1A58.4 58.4 0 0 0 10.8 4.9a.21.21 0 0 0-.1.08C1.58 18.9-.96 32.6.3 46.1c.01.07.05.14.1.18A58.8 58.8 0 0 0 18 54.6a.23.23 0 0 0 .25-.08 42 42 0 0 0 3.63-5.9.22.22 0 0 0-.12-.3 38.7 38.7 0 0 1-5.53-2.63.23.23 0 0 1-.02-.38c.37-.28.74-.56 1.1-.86a.22.22 0 0 1 .23-.03c11.6 5.3 24.15 5.3 35.6 0a.22.22 0 0 1 .23.02c.36.3.73.6 1.1.87a.23.23 0 0 1-.02.38 36.4 36.4 0 0 1-5.54 2.62.23.23 0 0 0-.12.31 47.1 47.1 0 0 0 3.62 5.89c.06.08.16.12.26.09a58.7 58.7 0 0 0 17.64-8.35.22.22 0 0 0 .1-.17c1.47-15.25-2.47-28.81-10.47-40.64a.18.18 0 0 0-.1-.09zM23.74 37.96c-3.49 0-6.37-3.21-6.37-7.15s2.82-7.15 6.37-7.15c3.58 0 6.43 3.24 6.37 7.15 0 3.94-2.83 7.15-6.37 7.15zm23.55 0c-3.49 0-6.36-3.21-6.36-7.15s2.82-7.15 6.36-7.15c3.58 0 6.43 3.24 6.37 7.15 0 3.94-2.79 7.15-6.37 7.15z" />
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16">
      {/* Radial glow behind title */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)",
        }}
      />

      <motion.div
        className="container mx-auto px-4 text-center relative z-10 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-block mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/[0.08] text-purple-300 text-sm font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered UEFN Tools — Free to start
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.06] tracking-tight text-white mb-6"
        >
          Generate Verse Systems{" "}
          <span className="gradient-text">for UEFN in Seconds</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Describe your Fortnite Creative system and get Verse code, device
          setup steps, and beginner-friendly explanations — no coding experience
          needed.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/login">
            <Button size="xl" className="w-full sm:w-auto glow-purple">
              {DISCORD_ICON}
              Login with Discord
            </Button>
          </Link>
          <Link href="#examples">
            <Button size="xl" variant="secondary" className="w-full sm:w-auto">
              View Examples
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.p
          variants={itemVariants}
          className="mt-8 text-sm text-slate-500"
        >
          Trusted by{" "}
          <span className="text-slate-300 font-semibold">2,000+</span> UEFN
          creators · Free tier always available
        </motion.p>
      </motion.div>
    </section>
  );
}
