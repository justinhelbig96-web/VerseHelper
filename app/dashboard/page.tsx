import { createClient } from "@/lib/supabase/server";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { RecentGenerations } from "@/components/dashboard/RecentGenerations";
import { QuickActions } from "@/components/dashboard/QuickActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "Creator";

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Your UEFN creator workspace
        </p>
      </div>

      {/* Welcome card — full width */}
      <WelcomeCard userName={displayName} credits={20} plan="free" />

      {/* Two-column section */}
      <div className="grid md:grid-cols-2 gap-5">
        <RecentGenerations />
        <QuickActions />
      </div>
    </div>
  );
}
