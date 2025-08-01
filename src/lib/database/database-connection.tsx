// 新的 database-connection.tsx
import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null;

// Supabase 配置 - 建议从环境变量读取
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tjeftfaumcgwkqbrfbzg.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZWZ0ZmF1bWNnd2txYnJmYnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDA0NDcsImV4cCI6MjA2ODY3NjQ0N30.1UT-BUSAh-sRPWijHHJ1m6Uz0HM2emL5q6TDH-_Vv_o'

export async function getDatabaseInstance(): Promise<SupabaseClient> {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
  return supabaseInstance;
}
