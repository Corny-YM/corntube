import { pipedAxios } from './index'
import { IChannel, IComments, IStreams, ITrending } from './model/piped'

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

export const getChannel = (id: number | string): Promise<IChannel> =>
  pipedAxios.get(`/channel/${id}`)
