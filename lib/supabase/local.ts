import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dttyujcdxzjqfgciqtdb.supabase.co";
const supabaseKey = "sb_publishable_5jDkhw4qOyJXmKVepD1-BQ_Y8YhUgYY";

export const supabase = createClient(supabaseUrl, supabaseKey);
