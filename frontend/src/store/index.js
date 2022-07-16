import { createStore } from 'vuex';
import userModule from './modules/user';
import taskModule from './modules/task';
import dictionaryModule from './modules/dictionary';

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: userModule,
    task: taskModule,
    dictionaries: dictionaryModule,
  },
})
