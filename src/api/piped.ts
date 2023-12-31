import { pipedAxios } from './index'
import {
  IChannel,
  IComments,
  IPlaylist,
  ISearch,
  IStreams,
  ITrending,
} from './model/piped'

export const getTrending = (params?: any): Promise<ITrending[]> =>
  pipedAxios.get('/trending', {
    params,
  })

export const getStreams = (id: any): Promise<IStreams> =>
  pipedAxios.get(`/streams/${id}`)

export const getComments = (id: any): Promise<IComments> =>
  pipedAxios.get(`/comments/${id}`)

export const getNextDataComments = ({
  id,
  nextpage,
}: {
  id: any
  nextpage: string
}): Promise<IComments> =>
  pipedAxios.get(`/nextpage/comments/${id}`, {
    params: {
      nextpage,
    },
  })

export const getChannel = (
  id: number | string,
  params?: any
): Promise<IChannel> =>
  pipedAxios.get(`/channel/${id}`, {
    params,
  })

export const getNextDataChannel = ({
  id,
  nextpage,
}: {
  id: any
  nextpage: string
}): Promise<IChannel> =>
  pipedAxios.get(`/nextpage/channel/${id}`, {
    params: {
      nextpage,
    },
  })

export const getTabsData = <T>(data: string, nextpage?: string): Promise<T> =>
  pipedAxios.get('/channels/tabs', {
    params: {
      data,
      nextpage,
    },
  })

export const getPlaylist = (id: any): Promise<IPlaylist> =>
  pipedAxios.get(`/playlists/${id}`)

export const getSuggestions = (query: string): Promise<string[]> =>
  pipedAxios.get('/suggestions', {
    params: { query },
  })

export const getSearchData = (params: {
  q: string
  filter: 'all' | 'videos' | 'channels' | 'playlists'
}): Promise<ISearch> =>
  pipedAxios.get('/search', {
    params,
  })

export const getNextDataSearch = (params: {
  q: string
  filter: 'all' | 'videos' | 'channels' | 'playlists'
  nextpage: string
}): Promise<ISearch> =>
  pipedAxios.get(`/nextpage/search`, {
    params,
  })
