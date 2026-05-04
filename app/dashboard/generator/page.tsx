"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Code2, Cpu, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateVerseCode } from "@/lib/ai";
import type { GenerateVerseResult } from "@/types";

const SUGGESTIONS = [
  "Award coins when a player enters a trigger zone",
  "Countdown timer that opens a gate when time runs out",
  "Button shop: deduct coins and grant an item to the buyer",
  "Zone unlock: player pays coins to open a new area",
  "Show a HUD message when a player enters a zone",
  "Grant a reward item after completing an objective",
  "Multi-trigger puzzle: activate 3 zones in sequence to win",
  "Health regen station that restores HP on trigger",
  "Spawn an enemy wave when players enter an area",
  "Track kills and update a per-player leaderboard score",
];

export default function GeneratorPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateVerseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await generateVerseCode({
        description,
        mapType: "Other",
        difficulty: "Beginner",
        outputType: "Code + Explanation",
      });
      setResult(res);
    } catch {
      setError("Failed to generate code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Verse Generator</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Describe your UEFN system and get clean Verse code instantly.
        </p>
      </div>

      {/* Input card */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Describe your system
          </label>
          <Textarea
            placeholder="Example: Award 50 coins when a player enters a trigger zone. Reset the counter if they leave and re-enter."
            className="min-h-[120px] resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-xs text-slate-500 mt-1.5">
            Be specific — the more detail you give, the better the output.
          </p>
        </div>

        {/* Suggestion chips */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            Quick ideas — click to fill
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setDescription(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-purple-500/40 hover:text-purple-300 hover:bg-purple-500/[0.06] transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <Button
          size="lg"
          onClick={handleGenerate}
          disabled={loading || !description.trim()}
          className="w-full sm:w-auto glow-purple"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Verse Code
            </>
          )}
        </Button>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </p>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <ResultPanel result={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultPanel({ result }: { result: GenerateVerseResult }) {
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  function copyText(text: string, tab: string) {
    navigator.clipboard.writeText(text);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="font-bold text-white mb-4 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-purple-400" />
        Generated Output
      </h2>

      <Tabs defaultValue="code">
        <TabsList className="mb-5 flex-wrap">
          <TabsTrigger value="code" className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            Verse Code
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Device Setup
          </TabsTrigger>
          <TabsTrigger value="explanation" className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Explanation
          </TabsTrigger>
          <TabsTrigger value="errors" className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            Common Errors
          </TabsTrigger>
        </TabsList>

        {/* Verse Code */}
        <TabsContent value="code">
          <div className="relative">
            <button
              onClick={() => copyText(result.code, "code")}
              className="absolute top-3 right-3 text-xs text-slate-500 hover:text-slate-200 transition-colors bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-1.5 z-10"
            >
              {copiedTab === "code" ? "Copied!" : "Copy"}
            </button>
            <pre className="code-block bg-[#0a0a10] border border-white/[0.07] rounded-xl p-5 overflow-x-auto text-slate-300 whitespace-pre">
              {result.code}
            </pre>
          </div>
        </TabsContent>

        {/* Device Setup */}
        <TabsContent value="devices">
          <div className="prose-dark text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-[#0a0a10] border border-white/[0.07] rounded-xl p-5">
            {result.deviceSetup}
          </div>
        </TabsContent>

        {/* Explanation */}
        <TabsContent value="explanation">
          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-[#0a0a10] border border-white/[0.07] rounded-xl p-5">
            {result.explanation || "No explanation requested for this output type."}
          </div>
        </TabsContent>

        {/* Common Errors */}
        <TabsContent value="errors">
          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap bg-[#0a0a10] border border-white/[0.07] rounded-xl p-5">
            {result.commonErrors}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
