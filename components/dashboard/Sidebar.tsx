"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Code2,
  BookOpen,
  Bug,
  CreditCard,
  Zap,
  ChevronLeft,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/generator", label: "Verse Generator", icon: Code2 },
  { href: "/dashboard/tutorials", label: "Tutorials", icon: BookOpen },
  { href: "/dashboard/error-fixer", label: "Error Fixer", icon: Bug },
  { href: "/dashboard/pricing", label: "Pricing", icon: CreditCard },
];

interface SidebarProps {
  user?: { email?: string; user_metadata?: { full_name?: string; avatar_url?: string } } | null;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  const displayName =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Creator";

  return (
    <aside
      className={cn(
        "relative flex flex-col h-full bg-[#07070c] border-r border-white/[0.06] transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center h-16 border-b border-white/[0.06] px-4 shrink-0",
          collapsed ? "justify-center" : "gap-2.5"
        )}
      >
        <div className="relative shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 blur opacity-30" />
        </div>
        {!collapsed && (
          <span className="font-bold text-white text-base leading-none">
            Verse<span className="gradient-text-purple">Pilot</span>
          </span>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[4.25rem] w-6 h-6 rounded-full bg-[#0e0e14] border border-white/[0.1] flex items-center justify-center text-slate-400 hover:text-white transition-colors z-10"
        aria-label="Toggle sidebar"
      >
        <ChevronLeft
          className={cn("w-3 h-3 transition-transform duration-300", collapsed && "rotate-180")}
        />
      </button>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                    collapsed ? "justify-center" : "",
                    active
                      ? "bg-purple-500/[0.12] text-purple-300 border border-purple-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  )}
                  title={collapsed ? label : undefined}
                >
                  <Icon
                    className={cn(
                      "shrink-0 transition-colors",
                      collapsed ? "w-5 h-5" : "w-4 h-4",
                      active ? "text-purple-400" : "group-hover:text-white"
                    )}
                  />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User footer */}
      <div className={cn("border-t border-white/[0.06] p-3 shrink-0", collapsed && "p-2")}>
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-1 mb-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{displayName}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email ?? "Discord"}</p>
            </div>
          </div>
        ) : null}
        <button
          onClick={handleSignOut}
          className={cn(
            "flex items-center gap-2 w-full rounded-lg text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all px-3 py-2",
            collapsed ? "justify-center" : ""
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
