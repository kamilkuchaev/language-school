import { login } from '@/services/auth.service'
import router from '../../router'

export default {
  namespaced: true,

  state () {
    return {
      isAuth: false,
      user: null
    }
  },

  getters: {
    getIsAuth (state) {
      return state.isAuth
    },
    getUser (state) {
      return state.user
    }
  },

  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_IS_AUTH (state, boolean) {
      state.isAuth = boolean
    },
    SET_TOKEN (state, token) {
      localStorage.setItem('accessToken', token)
    },
    LOGOUT (state) {
      state.isAuth = false
      state.user = null
    }
  },

  actions: {
    async onLogin ({ commit }, formData) {
      const res = await login(formData)
      commit('SET_USER', res.user)
      commit('SET_IS_AUTH', true)
      // if (res?.token) {
      //   commit('SET_TOKEN', data.token)
      // }
    },
    async onLogout ({ commit }) {
      try {
        // await logout()
        commit('LOGOUT')
      } finally {
        await router.push({ name: 'home' })
      }
    }
  }
}
