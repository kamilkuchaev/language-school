import { getUser } from '../../services/user.service'

export default {
  namespaced: true,
  state () {
    return {
      user: null,
      users: null
    }
  },
  getters: {
    user: state => state.user,
    id: state => state.user?.id,
    name: state => state.user?.name,
    lastname: state => state.user?.lastname,
    email: state => state.user?.email,
    dictionaries: state => state.user?.dictionaries,
    tasks: state => state.user?.tasks,
    groups: state => state.user?.groups
  },
  mutations: {
    setCurrentUser (state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchUser ({ commit }, payload) {
      try {
        const { data } = await getUser(payload.id)
        commit('setCurrentUser', data)
      } catch (e) {
        console.error('fetchUser', e)
      }
    }
  }
}
