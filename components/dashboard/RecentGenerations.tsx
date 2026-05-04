"use client";

import { motion } from "framer-motion";
import { Code2, Clock } from "lucide-react";
import { timeAgo } from "@/lib/utils";

interface Generation {
  id: string;
  description: string;
  mapType: string;
  createdAt: string;
}

// Mock data for demo — replace with real Supabase query
const MOCK_GENERATIONS: Generation[] = [
  {
    id: "1",
    description: "Tycoon collector that awards 50 coins when player enters zone",
    mapType: "Tycoon",
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  {
    id: "2",
    description: "Button shop that costs 200 coins and grants a weapon",
    mapType: "Tycoon",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "3",
    description: "Countdown timer that opens gate when it expires",
    mapType: "Escape",
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "4",
    description: "Zone unlock system costing 500 coins",
    mapType: "Tycoon",
    createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
  },
];

const MAP_TYPE_COLORS: Record<string, string> = {
  Tycoon: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Parkour: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Escape: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Simulator: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Other: "text-slate-400 bg-slate-500/10 border-slate-500/20",
};

export function RecentGenerations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <Code2 className="w-4 h-4 text-purple-400" />
        Recent Generations
      </h3>

      <ul className="space-y-2">
        {MOCK_GENERATIONS.map((gen) => (
          <li
            key={gen.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="mt-0.5 w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-200 truncate group-hover:text-white transition-colors">
                {gen.description}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    MAP_TYPE_COLORS[gen.mapType] ?? MAP_TYPE_COLORS.Other
                  }`}
                >
                  {gen.mapType}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Clock className="w-2.5 h-2.5" />
                  {timeAgo(gen.createdAt)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
