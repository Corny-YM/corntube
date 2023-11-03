import { pipedAxios } from './index'
import {
  IChannel,
  IComments,
  IStreams,
  ITabShort,
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

export const getMoreComments = ({
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

export const getTabsData = (data: string): Promise<ITabShort> =>
  pipedAxios.get('/channels/tabs', {
    params: {
      data,
    },
  })
