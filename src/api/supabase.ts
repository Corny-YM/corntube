import supabase from '@/services/supabase'

export const getUser = () => {
  return supabase.auth.getSession()
}

export const loginGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'email',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
}
