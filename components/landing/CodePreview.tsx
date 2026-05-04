"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Copy } from "lucide-react";

const VERSE_EXAMPLE = `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }

# Tycoon collector — awards coins when player enters zone
collector_device := class(creative_device):

    @editable CollectZone : trigger_device = trigger_device{}
    @editable Wallet      : economy_device  = economy_device{}

    CoinsPerCollect : int = 50

    OnBegin<override>()<suspends> : void =
        CollectZone.TriggeredEvent.Subscribe(OnCollect)

    OnCollect(Agent : agent) : void =
        if (Player := player[Agent]):
            Wallet.AddResource(Player, CoinsPerCollect)`;

// Syntax highlighter — runs client-side only to avoid SSR/hydration mismatch.
function highlightLine(line: string): string {
  // Escape HTML first so injected spans don't interfere with subsequent regexes
  const escaped = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    // Comments (must run first, before any other replacement)
    .replace(/(#.*)$/, '<span class="text-slate-500 italic">$1</span>')
    // Decorators
    .replace(/(@\w+)/g, '<span class="text-yellow-400">$1</span>')
    // Type modifiers in angle brackets
    .replace(/(&lt;\w+&gt;)/g, '<span class="text-blue-400">$1</span>')
    // Keywords
    .replace(
      /\b(using|class|if|else|return|var|set|spawn|for|not|true|false|override|suspends)\b/g,
      '<span class="text-purple-400 font-medium">$1</span>'
    )
    // Built-in types
    .replace(
      /\b(void|int|float|string|logic|agent|player|creative_device|trigger_device|economy_device|array|map)\b/g,
      '<span class="text-cyan-400">$1</span>'
    )
    // Strings
    .replace(/(&quot;[^&]*&quot;|"[^"]*")/g, '<span class="text-emerald-400">$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
}

function CodeHighlight({ code }: { code: string }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    setLines(code.split("\n").map(highlightLine));
  }, [code]);

  // Server render: plain text, no colour — avoids hydration mismatch
  if (lines.length === 0) {
    return (
      <>
        {code.split("\n").map((line, i) => (
          <div key={i} className="flex">
            <span className="select-none w-8 text-right pr-4 text-slate-600 shrink-0 text-sm">
              {i + 1}
            </span>
            <span className="text-slate-300 text-sm">{line}</span>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {lines.map((html, i) => (
        <div key={i} className="flex">
          <span className="select-none w-8 text-right pr-4 text-slate-600 shrink-0 text-sm">
            {i + 1}
          </span>
          <span
            className="text-slate-300 text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      ))}
    </>
  );
}

export function CodePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(VERSE_EXAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="examples" className="py-24 relative">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div ref={ref} className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — explanation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-300 border border-blue-500/25 bg-blue-500/[0.06] mb-4">
              Example Output
            </span>
            <h2 className="text-4xl font-extrabold text-white mb-5 leading-tight tracking-tight">
              Real Verse Code, <br />
              <span className="gradient-text">Ready in Seconds</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Type a description like{" "}
              <em className="text-slate-300">
                "Award 50 coins when player enters collector zone"
              </em>{" "}
              and VersePilot generates clean, commented Verse code with device
              setup steps — no guessing required.
            </p>

            {/* Feature checklist */}
            <ul className="space-y-3">
              {[
                "Syntax-correct Verse code every time",
                "Device setup guide included",
                "Beginner explanations for every concept",
                "Common errors & fixes attached",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — code card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="ml-2 text-xs text-slate-500 font-mono">
                    collector_device.verse
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors py-1 px-2 rounded-md hover:bg-white/[0.05]"
                >
                  {copied ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Code */}
              <div className="p-5 overflow-x-auto">
                <pre className="code-block leading-7 whitespace-pre">
                  <CodeHighlight code={VERSE_EXAMPLE} />
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
