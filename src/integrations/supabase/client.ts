import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = "https://hjiiusksghgkeixxqxok.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqaWl1c2tzaGdreGVpeHhxeG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNjU2MzYsImV4cCI6MjA2NDk0MTYzNn0.mPg03s9BwG20nwBMGwTKLEGJvDjYlNEpdIhjEHrxADM"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)