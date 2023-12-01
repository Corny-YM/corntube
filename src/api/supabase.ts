import supabase from '@/services/supabase'

export const loginGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
  })
}
