import Link from "next/link";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { TUTORIALS } from "@/data/tutorials";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tutorials" };

const DIFFICULTY_VARIANT = {
  Beginner: "green" as const,
  Intermediate: "blue" as const,
  Advanced: "default" as const,
};

export default function TutorialsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Tutorials</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Step-by-step UEFN guides with real Verse code and device setup.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TUTORIALS.map((tutorial) => (
          <Link key={tutorial.slug} href={`/dashboard/tutorials/${tutorial.slug}`}>
            <div className="group glass-card rounded-2xl p-5 h-full hover:border-purple-500/25 hover:bg-purple-500/[0.03] transition-all duration-300 cursor-pointer">
              {/* Icon + badges */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <Badge variant={DIFFICULTY_VARIANT[tutorial.difficulty]}>
                  {tutorial.difficulty}
                </Badge>
              </div>

              {/* Title & description */}
              <h3 className="font-bold text-white text-sm mb-1.5 group-hover:text-purple-200 transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {tutorial.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  {tutorial.estimatedTime}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
