import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
if (!OPENROUTER_API_KEY) throw new Error("VITE_OPENROUTER_API_KEY is missing");

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey)
  throw new Error("Supabase env vars missing");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
