import Link from "next/link";
import { Zap, Github } from "lucide-react";

const DISCORD_SVG = (
  <svg className="w-4 h-4" viewBox="0 0 71 55" fill="currentColor" aria-hidden>
    <path d="M60.1 4.9A58.5 58.5 0 0 0 45.6.6a.22.22 0 0 0-.23.1 40.7 40.7 0 0 0-1.8 3.7 54 54 0 0 0-16.2 0 37.4 37.4 0 0 0-1.82-3.7.23.23 0 0 0-.23-.1A58.4 58.4 0 0 0 10.8 4.9a.21.21 0 0 0-.1.08C1.58 18.9-.96 32.6.3 46.1c.01.07.05.14.1.18A58.8 58.8 0 0 0 18 54.6a.23.23 0 0 0 .25-.08 42 42 0 0 0 3.63-5.9.22.22 0 0 0-.12-.3 38.7 38.7 0 0 1-5.53-2.63.23.23 0 0 1-.02-.38c.37-.28.74-.56 1.1-.86a.22.22 0 0 1 .23-.03c11.6 5.3 24.15 5.3 35.6 0a.22.22 0 0 1 .23.02c.36.3.73.6 1.1.87a.23.23 0 0 1-.02.38 36.4 36.4 0 0 1-5.54 2.62.23.23 0 0 0-.12.31 47.1 47.1 0 0 0 3.62 5.89c.06.08.16.12.26.09a58.7 58.7 0 0 0 17.64-8.35.22.22 0 0 0 .1-.17c1.47-15.25-2.47-28.81-10.47-40.64a.18.18 0 0 0-.1-.09zM23.74 37.96c-3.49 0-6.37-3.21-6.37-7.15s2.82-7.15 6.37-7.15c3.58 0 6.43 3.24 6.37 7.15 0 3.94-2.83 7.15-6.37 7.15zm23.55 0c-3.49 0-6.36-3.21-6.36-7.15s2.82-7.15 6.36-7.15c3.58 0 6.43 3.24 6.37 7.15 0 3.94-2.79 7.15-6.37 7.15z" />
  </svg>
);

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/dashboard/pricing" },
    { label: "Tutorials", href: "/dashboard/tutorials" },
    { label: "Changelog", href: "#" },
  ],
  Tools: [
    { label: "Verse Generator", href: "/dashboard/generator" },
    { label: "Error Fixer", href: "/dashboard/error-fixer" },
    { label: "Device Setup", href: "/dashboard/tutorials" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Company: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Contact", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative pt-16 pb-10 border-t border-white/[0.06]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                Verse<span className="gradient-text-purple">Pilot</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-5 max-w-[220px]">
              AI-powered Verse code generation for UEFN creators.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#5865F2] transition-colors bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5"
              >
                {DISCORD_SVG}
                Discord
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.05]">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} VersePilot. Built for UEFN creators.
          </p>
          <p className="text-xs text-slate-600">
            Not affiliated with Epic Games or Fortnite.
          </p>
        </div>
      </div>
    </footer>
  );
}
