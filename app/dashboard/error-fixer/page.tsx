"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, Loader2, Sparkles, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fixVerseError } from "@/lib/ai";
import type { FixErrorResult } from "@/types";

export default function ErrorFixerPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FixErrorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFix() {
    if (!errorMessage.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fixVerseError({ errorMessage, code });
      setResult(res);
    } catch {
      setError("Failed to analyse the error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Error Fixer</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Paste your UEFN compile error and code. Get an explanation and a fixed version.
        </p>
      </div>

      {/* Input card */}
      <div className="glass-card rounded-2xl p-6 space-y-5">
        {/* Error message */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-400" />
            UEFN Compile Error Message
          </label>
          <Textarea
            placeholder={`Paste your error here, e.g.:\nerror: 'agent' is not 'player'; use 'player[Agent]' to downcast`}
            className="min-h-[90px] font-mono text-xs text-red-300 placeholder:text-slate-600"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
          />
        </div>

        {/* Code snippet */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Your Verse Code <span className="text-slate-500 font-normal">(optional but recommended)</span>
          </label>
          <Textarea
            placeholder="Paste the relevant Verse code block here..."
            className="min-h-[160px] font-mono text-xs"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <Button
          size="lg"
          onClick={handleFix}
          disabled={loading || !errorMessage.trim()}
          className="w-full sm:w-auto"
          variant="destructive"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analysing...
            </>
          ) : (
            <>
              <Bug className="w-4 h-4" />
              Fix Error
            </>
          )}
        </Button>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Problem */}
            <div className="glass-card rounded-2xl p-5 border border-red-500/15">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                Problem Identified
              </h3>
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {result.problem}
              </div>
            </div>

            {/* Fixed code */}
            <div className="glass-card rounded-2xl overflow-hidden border border-emerald-500/15">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Corrected Code
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(result.fixedCode)}
                  className="text-xs text-slate-500 hover:text-slate-200 transition-colors"
                >
                  Copy
                </button>
              </div>
              <pre className="code-block p-5 overflow-x-auto text-slate-300 whitespace-pre text-sm leading-7">
                {result.fixedCode}
              </pre>
            </div>

            {/* Explanation */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                Explanation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Prevention tip */}
            <div className="glass-card rounded-2xl p-5 border border-yellow-500/15">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                Prevention Tip
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {result.preventionTip}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
