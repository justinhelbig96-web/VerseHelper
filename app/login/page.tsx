"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const DISCORD_SVG = (
  <svg className="w-5 h-5" viewBox="0 0 71 55" fill="currentColor" aria-hidden>
    <path d="M60.1 4.9A58.5 58.5 0 0 0 45.6.6a.22.22 0 0 0-.23.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0 37.4 37.4 0 0 0-1.82-3.7.23.23 0 0 0-.23-.1A58.4 58.4 0 0 0 10.8 4.9a.21.21 0 0 0-.1.08C1.58 18.9-.96 32.6.3 46.1c.01.07.05.14.1.18A58.8 58.8 0 0 0 18 54.6a.23.23 0 0 0 .25-.08 42 42 0 0 0 3.63-5.9.22.22 0 0 0-.12-.3 38.7 38.7 0 0 1-5.53-2.63.23.23 0 0 1-.02-.38c.37-.28.74-.56 1.1-.86a.22.22 0 0 1 .23-.03c11.6 5.3 24.15 5.3 35.6 0a.22.22 0 0 1 .23.02c.36.3.73.6 1.1.87a.23.23 0 0 1-.02.38 36.4 36.4 0 0 1-5.54 2.62.23.23 0 0 0-.12.31 47.1 47.1 0 0 0 3.62 5.89c.06.08.16.12.26.09a58.7 58.7 0 0 0 17.64-8.35.22.22 0 0 0 .1-.17c1.47-15.25-2.47-28.81-10.47-40.64a.18.18 0 0 0-.1-.09zM23.74 37.96c-3.49 0-6.37-3.21-6.37-7.15s2.82-7.15 6.37-7.15c3.58 0 6.43 3.24 6.37 7.15 0 3.94-2.83 7.15-6.37 7.15zm23.55 0c-3.49 0-6.36-3.21-6.36-7.15s2.82-7.15 6.36-7.15c3.58 0 6.43 3.24 6.37 7.15 0 3.94-2.79 7.15-6.37 7.15z" />
  </svg>
);

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDiscordLogin() {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        scopes: "identify email guilds",
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // On success, the browser is redirected — no further action needed here.
  }

  const PERKS = [
    "20 free Verse code generations",
    "Full tutorial library access",
    "Unlimited error fixes",
    "Save your generations",
  ];

  return (
    <main className="relative min-h-screen bg-[#050508] flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }}
      />
      {/* Grid */}
      <div className="absolute inset-0 hero-grid opacity-40" />

      <div className="relative z-10 w-full max-w-md mx-auto px-4 py-16">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 blur-md opacity-40" />
            </div>
            <span className="font-extrabold text-white text-2xl">
              Verse<span className="gradient-text-purple">Pilot</span>
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to start generating Verse code
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card rounded-2xl p-7"
        >
          {/* Discord button */}
          <Button
            size="lg"
            onClick={handleDiscordLogin}
            disabled={loading}
            className="w-full h-12 text-base bg-[#5865F2] hover:bg-[#4752C4] from-[#5865F2] to-[#5865F2] transition-colors mb-4"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              <>
                {DISCORD_SVG}
                Continue with Discord
              </>
            )}
          </Button>

          {error && (
            <p className="text-sm text-red-400 text-center mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Divider */}
          <div className="relative flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-xs text-slate-500">What you get</span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Perks */}
          <ul className="space-y-2.5 mb-5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          {/* Footer note */}
          <div className="flex items-start gap-2 text-xs text-slate-500 bg-white/[0.03] rounded-lg px-3 py-2.5">
            <Shield className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-500" />
            <span>
              We only request your Discord username and avatar. We never post to your account.
            </span>
          </div>
        </motion.div>

        <p className="text-center text-xs text-slate-600 mt-6">
          By signing in you agree to our{" "}
          <a href="#" className="text-slate-400 hover:text-white transition-colors underline underline-offset-2">Terms</a>{" "}
          &amp;{" "}
          <a href="#" className="text-slate-400 hover:text-white transition-colors underline underline-offset-2">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}
