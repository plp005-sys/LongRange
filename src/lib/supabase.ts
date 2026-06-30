import { createClient } from '@supabase/supabase-js';

// Get environment variables
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure URL is at least syntactically valid to prevent app crashes on load,
// even if it's a dummy URL or incorrectly entered.
let supabaseUrl = 'https://placeholder.supabase.co';
if (envUrl) {
  try {
    new URL(envUrl); // Throws if invalid
    supabaseUrl = envUrl;
  } catch (e) {
    console.error("Invalid VITE_SUPABASE_URL format. It must be a valid URL starting with https://. Using placeholder instead.");
  }
}

const supabaseAnonKey = envKey || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
