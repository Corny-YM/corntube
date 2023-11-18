import { messagePopup } from '@/utils'
import axios, { AxiosError } from 'axios'

const cancelTokens = new Map<string, AbortController>()

export const pipedAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Request
pipedAxios.interceptors.request.use((config) => {
  if (config.method?.toUpperCase() === 'GET') {
    const url = config.url
    const abortController = new AbortController()
    if (cancelTokens.get(url!)) cancelTokens.get(url!)?.abort()
    config.signal = abortController.signal
    cancelTokens.set(url!, abortController)
  }
  return config
})

// Response
pipedAxios.interceptors.response.use(
  (res) => {
    if (res.config.method === 'GET') {
      cancelTokens.delete(res.config.url!)
    }
    return res.data
  },
  (err: AxiosError) => {
    const apiUrl = err.config?.url!
    if (apiUrl !== '/suggestions' && !cancelTokens.get(apiUrl)) {
      messagePopup({
        content: 'Something went wrong with the API 💀💀💀',
        type: 'error',
      })
    }
    if (!err.response) throw err
    throw err
  }
)
