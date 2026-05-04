import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Cpu, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { TUTORIALS } from "@/data/tutorials";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = TUTORIALS.find((t) => t.slug === slug);
  return { title: tutorial?.title ?? "Tutorial" };
}

const DIFFICULTY_VARIANT = {
  Beginner: "green" as const,
  Intermediate: "blue" as const,
  Advanced: "default" as const,
};

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = TUTORIALS.find((t) => t.slug === slug);
  if (!tutorial) notFound();

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back link */}
      <Link
        href="/dashboard/tutorials"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tutorials
      </Link>

      {/* Header */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant={DIFFICULTY_VARIANT[tutorial.difficulty]}>
            {tutorial.difficulty}
          </Badge>
          <Badge variant="subtle">{tutorial.category}</Badge>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {tutorial.estimatedTime}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-white mb-2">
          {tutorial.title}
        </h1>
        <p className="text-slate-400 leading-relaxed">{tutorial.whatItDoes}</p>

        {/* Required devices */}
        <div className="mt-4 pt-4 border-t border-white/[0.06]">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Required Devices
          </p>
          <div className="flex flex-wrap gap-2">
            {tutorial.devices.map((d) => (
              <code
                key={d}
                className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg px-2.5 py-1 font-mono"
              >
                {d}
              </code>
            ))}
          </div>
        </div>
      </div>

      {/* Verse Code */}
      {tutorial.codeAnnotations ? (
        <div className="space-y-4">
          <h2 className="font-bold text-white text-lg">Code Walkthrough</h2>
          {tutorial.codeAnnotations.map((ann, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              {/* Section header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center text-[11px] font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-200">{ann.section}</span>
              </div>
              {/* Code */}
              <pre className="code-block p-5 overflow-x-auto text-slate-300 whitespace-pre text-sm leading-7">
                {ann.code}
              </pre>
              {/* Explanation */}
              <div className="px-5 py-4 border-t border-white/[0.06] bg-blue-500/[0.03] flex gap-3">
                <div className="w-1 rounded-full bg-blue-500/40 shrink-0 self-stretch" />
                <p className="text-sm text-slate-400 leading-relaxed">{ann.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-slate-500 font-mono">
                {tutorial.slug.replace(/-/g, "_")}_device.verse
              </span>
            </div>
          </div>
          <pre className="code-block p-5 overflow-x-auto text-slate-300 whitespace-pre text-sm leading-7">
            {tutorial.verseCode}
          </pre>
        </div>
      )}

      {/* Setup Steps */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-bold text-white mb-4">Setup Steps</h2>
        <ol className="space-y-3">
          {tutorial.setupSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <Separator />

      {/* Common Mistakes */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          Common Mistakes
        </h2>
        <ul className="space-y-3">
          {tutorial.commonMistakes.map((mistake, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
              <span className="mt-0.5 w-4 h-4 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                !
              </span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tutorial.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-slate-500 bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
