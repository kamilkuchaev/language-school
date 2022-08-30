import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
const ONE_HOUR = 1000 * 60 * 60
const defaultCache = new LRUCache({ maxAge: ONE_HOUR })

export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    const token = app.$auth.getToken('local') || app.$cookies.get('auth._token.local') || ''

    if (config.method === 'post') {
      if (config.data instanceof FormData) {
        config.data.append('token', token)
      } else {
        config.data = { ...config.data, token }
      }
    } else if (config.method === 'get') {
      if (config.params && !config.params.hasOwnProperty('token')) {
        config.params = { ...config.params, token }
      } else {
        config = { ...config, params: { token } }
      }
    }
    return config
  })

  $axios.onError((error) => {
    console.dir(error)
    return Promise.reject(error)
  })

  const defaults = app.$axios.defaults
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: 'useCache',
    defaultCache,
  })
}
