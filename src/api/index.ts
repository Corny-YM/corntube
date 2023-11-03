import axios from 'axios'
import { messagePopup } from '@/utils'

export const pipedAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Request
pipedAxios.interceptors.request.use((config) => {
  return config
})

// Response
pipedAxios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    messagePopup({ title: 'Something went wrong with the API', type: 'error' })
    if (!err.response) throw err
    throw err
  }
)
