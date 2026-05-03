import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ackwjybxhjqoclxgltcq.supabase.co";
const supabaseKey = "sb_publishable_sRI2iLWxvTJ62rz22YxelA_-xScg4ia";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);