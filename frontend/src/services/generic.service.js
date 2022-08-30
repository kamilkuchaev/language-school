import axios from 'axios'
import router from '../router'

// const BASE_URL = process.env.VUE_APP_SERVER_URL
const API_URL = 'https://dev-language-school-gb.herokuapp.com'
// const API_URL = 'http://localhost:8000'
const BASE_URL = '/sanctum/csrf-cookie'
let CSRF_TOKEN

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  headers: { 'X-XSRF-TOKEN': CSRF_TOKEN },
})

export const request = async ({ url, method, data = {} }) => {
  const response = await instance[method](`${API_URL}/${url}`, data)
  return response.data
}

export const requestAuth = async ({ url, method, data = {} }) => {
  await instance.get(BASE_URL)
  const response = await instance[method](`${API_URL}/api/${url}`, data)
  return response.data
}

instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    if (error.response.status === 401) {
      await router.push('/login')
    }
    throw error
  }
)


