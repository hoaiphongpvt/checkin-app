import { API_ROOT, TIMEOUT } from '@/constants/api'
import axios from 'axios'

const api = axios.create({
  baseURL: API_ROOT,
  timeout: TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default api
