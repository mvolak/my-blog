// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// export const supabase = createClient(supabaseUrl, supabaseKey)

// Example function to fetch posts
// export async function getPosts() {
//   const { data: posts, error } = await supabase
//     .from('posts')
//     .select('*')
//     .order('created_at', { ascending: false })

//   if (error) {
//     console.error('Error fetching posts:', error)
//     return []
//   }

//   return posts
// }


export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false
    }
  })