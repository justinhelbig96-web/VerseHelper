import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase browser client for client-side components.
 * Safe to call multiple times — always returns the same singleton.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
