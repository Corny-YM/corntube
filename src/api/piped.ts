import { pipedAxios } from './index'
import { IComments, IStreams, ITrending } from './model/piped'

export const getTrending = (params?: any): Promise<ITrending[]> =>
  pipedAxios.get('/trending', {
    params,
  })

export const getStreams = (id: any): Promise<IStreams> =>
  pipedAxios.get(`/streams/${id}`)

export const getComments = (id: any): Promise<IComments> =>
  pipedAxios.get(`/comments/${id}`)
