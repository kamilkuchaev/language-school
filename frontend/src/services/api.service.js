import axios from 'axios'
import store from '@/store'

const API_URL = 'https://dev-language-school-gb.herokuapp.com'
// const API_URL = 'http://localhost:8000'

export const apiClient = axios.create({
  baseURL: API_URL + '/api',
  withCredentials: true
})

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    if (error.response
	    && [401, 419].includes(error.response.status)
	    && store.getters['auth/authUser']
	    && !store.getters['auth/guest']
    ) {
      store.dispatch('auth/logout')
    }
    return Promise.reject(error)
  }
)
