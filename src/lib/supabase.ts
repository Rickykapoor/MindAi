import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://arqejfpekfmsoertjydt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFycWVqZnBla2Ztc29lcnRqeWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTE1NjUsImV4cCI6MjA2NDk4NzU2NX0.cT89ogibrAX92REa6DVhlu4IAyxkMnxbMwMycer-Kl8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
