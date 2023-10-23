import axios from 'axios'
import { message } from 'ant-design-vue'

export const pipedAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Response
pipedAxios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (!err.response) throw err
    // const { status } = err.respons
    message.error('Something went wrong with the API')
    throw err
  }
)
