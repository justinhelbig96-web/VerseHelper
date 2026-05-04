import { CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing" };

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "Perfect for getting started with UEFN and exploring VersePilot.",
    features: [
      "20 Verse code generations/month",
      "Full tutorial library",
      "Unlimited error fixes",
      "Save up to 20 generations",
      "Community Discord access",
    ],
    highlighted: false,
    cta: "Get Started",
    href: "/login",
  },
  {
    id: "pro",
    name: "Pro",
    price: 9,
    period: "month",
    description: "For active UEFN creators who ship projects regularly.",
    features: [
      "Unlimited Verse code generations",
      "Full tutorial library",
      "Unlimited error fixes",
      "Save unlimited generations",
      "Priority AI response speed",
      "Advanced output (Full Setup Guide)",
      "Early access to new features",
    ],
    highlighted: true,
    cta: "Upgrade to Pro",
    href: "/login",
  },
  {
    id: "team",
    name: "Team",
    price: 29,
    period: "month",
    description: "For studios and creators building multiple UEFN maps together.",
    features: [
      "Everything in Pro",
      "Up to 5 team members",
      "Shared generation history",
      "Team templates library",
      "Priority support",
      "Custom system prompts",
    ],
    highlighted: false,
    cta: "Contact us",
    href: "#",
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white mb-3">Simple Pricing</h1>
        <p className="text-slate-400">
          Start free, upgrade when you need more. No hidden fees.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative glass-card rounded-2xl p-6 flex flex-col transition-all duration-300 ${
              plan.highlighted
                ? "border-purple-500/30 bg-purple-500/[0.04] scale-[1.02]"
                : "hover:border-white/[0.12]"
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold shadow-lg">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan info */}
            <div className="mb-5">
              <h2 className="font-bold text-white text-lg mb-1">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-white">
                  ${plan.price}
                </span>
                {plan.price > 0 && (
                  <span className="text-slate-400 text-sm">/{plan.period}</span>
                )}
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {plan.description}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href={plan.href}>
              <Button
                variant={plan.highlighted ? "default" : "secondary"}
                className={`w-full ${plan.highlighted ? "glow-purple" : ""}`}
              >
                {plan.cta}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ note */}
      <p className="text-center text-sm text-slate-500">
        Questions?{" "}
        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
          Join our Discord
        </a>{" "}
        or read the{" "}
        <Link href="/#faq" className="text-purple-400 hover:text-purple-300 transition-colors">
          FAQ
        </Link>
        .
      </p>
    </div>
  );
}
