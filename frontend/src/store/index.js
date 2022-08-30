import { createStore } from 'vuex'
import authModule from './modules/auth.module'
import userModule from './modules/user.module'
import taskModule from './modules/task'
import dictionaryModule from './modules/dictionary'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
    user: userModule,
    task: taskModule,
    dictionaries: dictionaryModule
  }
})
