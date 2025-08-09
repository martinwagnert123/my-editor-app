// Supabase configuration
import { createClient } from '@supabase/supabase-js'

// Hämta miljövariabler med fallback
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://btbrdiaanylvjttuyyoq.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_9t8tb-nCBTTqCqAylVDZcQ_T3T0yVcm'

// Kontrollera att miljövariablerna finns (endast i utveckling)
if (process.env.NODE_ENV === 'development') {
  if (!process.env.REACT_APP_SUPABASE_URL || !process.env.REACT_APP_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase miljövariabler saknas, använder fallback-värden')
  }
}

// Skapa Supabase-klienten
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Logga endast i utveckling
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Supabase configuration loaded')
  console.log('URL:', supabaseUrl ? '✅ Konfigurerad' : '❌ Saknas')
  console.log('Key:', supabaseAnonKey ? '✅ Konfigurerad' : '❌ Saknas')
}
