"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    q: "What is VersePilot?",
    a: "VersePilot is an AI-powered toolset for UEFN (Unreal Editor for Fortnite) creators. It generates Verse code, explains device setups, and fixes compile errors — saving you hours of documentation hunting and trial-and-error.",
  },
  {
    q: "Do I need coding experience to use it?",
    a: "Not at all. VersePilot is designed for all skill levels. You describe what you want in plain English and it outputs ready-to-use Verse code with written explanations. Total beginners can follow along step-by-step.",
  },
  {
    q: "What kind of systems can it generate?",
    a: "Tycoon collectors, button shops, parkour timers, HUD messages, item granter rewards, zone unlocks, player tracking maps, save-state systems, and much more. If it can be built in UEFN with Verse, VersePilot can help.",
  },
  {
    q: "How does the Error Fixer work?",
    a: "Paste your UEFN compile error message and your code into the Error Fixer. It analyses the error, explains the root cause in plain English, and returns a corrected version of your code with a tip to prevent it in future.",
  },
  {
    q: "Is my code stored or shared?",
    a: "Your generations are saved to your account for your own reference — they are private by default and never shared with other users. You can delete them at any time from the Dashboard.",
  },
  {
    q: "What does the free plan include?",
    a: "The free plan includes 20 Verse code generations, full access to all tutorials, and unlimited use of the Error Fixer. No credit card needed to start. Upgrade to Pro for unlimited generations and priority AI responses.",
  },
  {
    q: "Does it work with the latest version of UEFN?",
    a: "Yes. VersePilot targets the current stable UEFN release and its Verse API. As UEFN updates, we update our model prompts and templates to stay current. Check the changelog if you're on an older build.",
  },
];

export function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div ref={ref} className="container mx-auto px-4 max-w-3xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-300 border border-cyan-500/25 bg-cyan-500/[0.06] mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400">
            Everything you need to know about VersePilot.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
