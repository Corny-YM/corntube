import supabase from '@/services/supabase'

export const getUser = async () => await supabase.auth.getUser()

export const loginGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
  })

export const logout = async () => await supabase.auth.signOut()
