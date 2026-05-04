"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Cpu,
  Bug,
  Building2,
  Timer,
  Database,
} from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  glowColor: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Verse Code Generator",
    description:
      "Describe your game mechanic in plain English. Get clean, commented Verse code ready to paste into UEFN.",
    color: "from-purple-500 to-violet-500",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "UEFN Device Setup Helper",
    description:
      "Get step-by-step device configuration guides for your specific map type — triggers, economy, prop movers, and more.",
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    icon: <Bug className="w-6 h-6" />,
    title: "Compile Error Fixer",
    description:
      "Paste your UEFN compile error and broken code. Get an explanation of what went wrong and a corrected version.",
    color: "from-red-400 to-orange-400",
    glowColor: "rgba(248,113,113,0.12)",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Tycoon System Builder",
    description:
      "Generate complete tycoon systems — shops, collectors, upgrades, HUD, and economy devices — from a single prompt.",
    color: "from-amber-400 to-yellow-400",
    glowColor: "rgba(251,191,36,0.1)",
  },
  {
    icon: <Timer className="w-6 h-6" />,
    title: "Parkour Timer Templates",
    description:
      "Ready-to-use timer systems with checkpoint tracking, leaderboards, and hud_message integration for parkour maps.",
    color: "from-emerald-400 to-teal-400",
    glowColor: "rgba(52,211,153,0.1)",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Save System Guide",
    description:
      "Learn how to persist player data across sessions using Verse maps, player state tracking, and volume devices.",
    color: "from-cyan-400 to-blue-400",
    glowColor: "rgba(6,182,212,0.1)",
  },
];

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-purple-300 border border-purple-500/25 bg-purple-500/[0.06] mb-4">
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Built for UEFN Creators
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            From first trigger to full tycoon — VersePilot covers every part of
            the UEFN development workflow.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
            >
              <FeatureCardItem {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCardItem({ icon, title, description, color, glowColor }: FeatureCard) {
  return (
    <div className="relative group glass-card rounded-2xl p-6 h-full hover:border-white/[0.14] transition-all duration-300 cursor-default">
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 30%, ${glowColor}, transparent 65%)` }}
      />

      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${color} text-white mb-4 shadow-lg`}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-bold text-white text-base mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
