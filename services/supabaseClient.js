import { createClient } from "@supabase/supabase-js";

/**
 * Safely creates a Supabase client instance.
 * This avoids build-time errors if env vars are missing during prerender.
 */
export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase environment variables are missing!");
    return null; // Prevent crashing the build
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};
