import { Response } from 'express'
import { NodeStatus } from '../../config/config'

function deleteGymCookies(res: Response) {
  // Eliminamos access Cookie
  res.cookie('gymAccessToken', {
    maxAge: 0,
    httpOnly: true,
    sameSite: true,
    secure:
      NodeStatus.env === 'development' || NodeStatus.env === 'test'
        ? undefined
        : true
  })
  // Eliminamos refresh Cookie
  res.cookie('gymAccessRefresh', {
    maxAge: 0,
    httpOnly: true,
    sameSite: true,
    secure:
      NodeStatus.env === 'development' || NodeStatus.env === 'test'
        ? undefined
        : true
  })
}
export default deleteGymCookies
