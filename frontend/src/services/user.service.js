import { request } from './generic.service'

const getUser = id => request({ url: `api/user/${id}`, method: 'get' })

const updateUser = (id, data) => request({ url: `api/user/${id}`, method: 'put', data })

const updateUserTask = (userId, taskId, data) => request({ url: `api/user/${userId}/task/${taskId}`, method: 'put', data })

export {
  getUser,
  updateUser,
  updateUserTask
}
