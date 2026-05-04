"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Code2, Cpu, BookOpen, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateVerseCode } from "@/lib/ai";
import type { GenerateVerseResult, MapType, Difficulty, OutputType } from "@/types";

export default function GeneratorPage() {
  const [description, setDescription] = useState("");
  const [mapType, setMapType] = useState<MapType>("Tycoon");
  const [difficulty, setDifficulty] = useState<Difficulty>("Beginner");
  const [outputType, setOutputType] = useState<OutputType>("Code + Explanation");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateVerseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!description.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await generateVerseCode({ description, mapType, difficulty, outputType });
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

        {/* Options row */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Map Type
            </label>
            <Select value={mapType} onValueChange={(v) => setMapType(v as MapType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["Tycoon", "Parkour", "Prop Hunt", "Escape", "Simulator", "Other"] as MapType[]).map(
                  (t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Difficulty
            </label>
            <Select value={difficulty} onValueChange={(v) => setDifficulty(v as Difficulty)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["Beginner", "Intermediate", "Advanced"] as Difficulty[]).map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Output Type
            </label>
            <Select value={outputType} onValueChange={(v) => setOutputType(v as OutputType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["Code only", "Code + Explanation", "Full Setup Guide"] as OutputType[]).map(
                  (o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
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
