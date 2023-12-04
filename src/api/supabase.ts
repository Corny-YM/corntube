import supabase from '@/services/supabase'
import { Json } from '@/services/database.types'

export const getUser = async () => await supabase.auth.getUser()

export const loginGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
  })

export const logout = async () => await supabase.auth.signOut()

export const userSubscription = async (data: {
  user_id: string
  subscriber: Json
}) => await supabase.from('Subscribeds').insert(data)

export const userSubscribed = async (id: string) =>
  await supabase.from('Subscribeds').select().eq('user_id', id)
