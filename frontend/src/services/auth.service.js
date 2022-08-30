import { requestAuth } from './generic.service'

export const login = data => requestAuth({ url: 'user/login', method: 'post', data })

export const register = data => requestAuth({ url: 'user/register', method: 'post', data })

export const logout = () => requestAuth({ url: 'user/logout', method: 'post' })
