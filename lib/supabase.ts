import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Gym {
  id: string
  slug: string
  name: string
  logo_url: string
  primary_color: string
  secondary_color: string
  welcome_message: string
  address: string
  hours: any
  instagram_handle: string
  language?: string
  created_at: string
}

export interface ShopItem {
  id: string
  gym_id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  promo_price?: number
  available: boolean
}
