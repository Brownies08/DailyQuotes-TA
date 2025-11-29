import { createClient } from '@supabase/supabase-js';

// 👇 Ganti dengan URL & Key asli Anda
const SUPABASE_URL = 'https://dzwetvesrmweuaeuaqdb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6d2V0dmVzcm13ZXVhZXVhcWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDc4MDksImV4cCI6MjA3OTkyMzgwOX0.fH29b5jDYs7ZLD1bwFLLn2CQebcgWiwQ1Aa1CfOD4jk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);