import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home'
import Practice from '@/views/Practice'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import DictionaryOne from '@/views/dictionaries/DictionaryOne'
import Dictionaries from '@/views/dictionaries/Dictionaries'
import DictionaryCreate from '@/views/dictionaries/DictionaryCreate'
import Account from '@/views/account/Index'
import AccountGroups from '@/views/account/Groups'
import AccountAchievements from '@/views/account/Achievements'

const routes = [
  { name: 'home', path: '/', component: Home },
  {
    name: 'practiceTest',
    path: '/practiceTest',
    component: Practice
  },
  {
    name: 'practice',
    path: '/practice/:dictionaryId',
    component: Practice,
    props: true
  },
  { name: 'login', path: '/login', component: Login },
  { name: 'register', path: '/register', component: Register },
  {
    name: 'account',
    path: '/account',
    redirect: { name: 'dictionariesNew' },
    component: Account,
    children: [
      {
        name: 'details',
        path: 'details',
        component: () => import('@/views/account/Details')
      },
      {
        name: 'dictionariesNew',
        path: 'dictionaries_new',
        component: () => import('@/views/account/Dictionaries')
      },
      {
        name: 'groups',
        path: 'groups',
        component: AccountGroups
      },
      {
        name: 'achievements',
        path: 'achievements',
        component: AccountAchievements
      }
    ]
  },
  { name: 'dictionaries', path: '/dictionaries', component: Dictionaries },
  { name: 'dictionaryOne', path: '/dictionaryOne/:id', component: DictionaryOne, props: true },
  { name: 'dictionaryCreate', path: '/dictionaryCreate', component: DictionaryCreate }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
