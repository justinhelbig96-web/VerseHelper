"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Bug, BookOpen, ArrowRight } from "lucide-react";

const ACTIONS = [
  {
    href: "/dashboard/generator",
    icon: Code2,
    label: "Generate Verse Code",
    description: "Describe a system, get code",
    color: "from-purple-500 to-violet-500",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    href: "/dashboard/error-fixer",
    icon: Bug,
    label: "Fix Compile Error",
    description: "Paste error + code, get fix",
    color: "from-red-400 to-orange-400",
    glowColor: "rgba(248,113,113,0.12)",
  },
  {
    href: "/dashboard/tutorials",
    icon: BookOpen,
    label: "Browse Tutorials",
    description: "Step-by-step UEFN guides",
    color: "from-emerald-400 to-teal-400",
    glowColor: "rgba(52,211,153,0.1)",
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="font-bold text-white mb-4">Quick Actions</h3>
      <div className="space-y-2.5">
        {ACTIONS.map(({ href, icon: Icon, label, description, color, glowColor }) => (
          <Link key={href} href={href}>
            <div className="relative group flex items-center gap-4 p-3.5 rounded-xl hover:bg-white/[0.05] transition-all duration-200 cursor-pointer">
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 20% 50%, ${glowColor}, transparent 70%)` }}
              />

              <div
                className={`relative w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md shrink-0`}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
