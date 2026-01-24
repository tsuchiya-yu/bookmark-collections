import { existsSync } from "node:fs";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/types";

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return { url: resolveSupabaseUrl(url), anonKey };
}

export function createSupabaseServerClient() {
  const { url, anonKey } = getSupabaseConfig();

  return createClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}

function resolveSupabaseUrl(rawUrl: string) {
  if (!existsSync("/.dockerenv")) {
    return rawUrl;
  }

  try {
    const parsed = new URL(rawUrl);
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
      parsed.hostname = "host.docker.internal";
    }
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}
