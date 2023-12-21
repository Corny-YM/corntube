import supabase from '@/services/supabase'
import {
  DestroySubscribedRequest,
  StoreSubscribedRequest,
} from './model/supabase'

export const getUser = async () => await supabase.auth.getUser()

export const loginGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: 'google',
  })

export const logout = async () => await supabase.auth.signOut()

// Subscribed
export const getSubscribedChannels = async (id: string) =>
  await supabase.from('Subscribeds').select().eq('user_id', id)

export const createSubscribedChannels = async (data: StoreSubscribedRequest) =>
  await supabase.from('Subscribeds').insert(data)

export const removeSubscribedChannels = async (
  data: DestroySubscribedRequest
) =>
  await supabase
    .from('Subscribeds')
    .delete()
    .eq('user_id', data.user_id)
    .eq('channel_id', data.channel_id)

// Playlist
export const createUserPlaylist = async (data: any) =>
  await supabase.from('Playlist').insert(data)
