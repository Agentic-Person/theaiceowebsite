import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// These will be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client (for browser use)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Server-side Supabase client (for API routes and server components)
export const createServerSupabaseClient = () => {
  return createClient<Database>(supabaseUrl, supabaseServiceRoleKey || supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Admin client for privileged operations (use sparingly)
// Only create when needed to avoid multiple client instances
export const getSupabaseAdmin = () => createServerSupabaseClient()

export default supabase
