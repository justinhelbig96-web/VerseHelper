"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WelcomeCardProps {
  userName?: string;
  credits?: number;
  plan?: string;
}

export function WelcomeCard({ userName = "Creator", credits = 20, plan = "free" }: WelcomeCardProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden glass-card rounded-2xl p-6 col-span-full"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 120% at 100% 50%, rgba(139,92,246,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400 mb-1">{greeting},</p>
          <h2 className="text-2xl font-extrabold text-white">
            {userName} 👋
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            You have{" "}
            <span className="text-purple-300 font-semibold">{credits} credits</span>{" "}
            on the{" "}
            <span className="capitalize font-semibold text-white">{plan}</span>{" "}
            plan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {plan === "free" && (
            <Link href="/dashboard/pricing">
              <Button size="sm" className="glow-purple">
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            </Link>
          )}
          <Link href="/dashboard/generator">
            <Button size="sm" variant="secondary">
              Generate Code
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
