import supabase from '@/services/supabase'
import {
  DestroySubscribedRequest,
  IAddUserPlaylistItem,
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
  await supabase
    .from('Subscribeds')
    .select()
    .eq('user_id', id)
    .order('created_at', { ascending: false })

export const createSubscribedChannels = async (data: StoreSubscribedRequest) =>
  await supabase.from('Subscribeds').insert(data).select('*').single()

export const removeSubscribedChannels = async (
  data: DestroySubscribedRequest
) =>
  await supabase
    .from('Subscribeds')
    .delete()
    .eq('user_id', data.user_id)
    .eq('channel_id', data.channel_id)

// User Playlist
export const getUserPlaylist = async (id: string) =>
  await supabase
    .from('UserPlaylists')
    .select(`*, PlaylistItem(*)`) // relation
    .eq('user_id', id)
    .order('created_at', { ascending: false })

export const createUserPlaylist = async ({
  user_id,
  name,
}: {
  user_id: string
  name: string
}) =>
  await supabase
    .from('UserPlaylists')
    .insert({
      user_id: user_id,
      name: name,
    })
    .select('*')
    .single()

// PlaylistItem
export const addUserPlaylistItem = async (data: IAddUserPlaylistItem) =>
  await supabase.from('PlaylistItem').insert(data).select('*').single()

export const removeUserPlaylistItem = async (id: number) =>
  await supabase.from('PlaylistItem').delete().eq('id', id).select('*').single()
