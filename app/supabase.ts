import { createClient } from "@supabase/supabase-js";

if (
  !process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY ||
  !process.env.NEXT_PUBLIC_SUPABASE_URL
) {
  throw new Error(`Error while connecting to Supabase`);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY
);

export default supabase;
