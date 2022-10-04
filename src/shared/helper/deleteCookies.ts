import { Response } from 'express'
import { NodeStatus } from '../../config/config'

function deleteCookies(res: Response) {
  // Eliminamos access Cookie
  res.cookie('accessToken', {
    maxAge: 0,
    httpOnly: true,
    sameSite: true,
    secure:
      NodeStatus.env === 'development' || NodeStatus.env === 'test'
        ? undefined
        : true
  })
  // Eliminamos refresh Cookie
  res.cookie('refreshToken', {
    maxAge: 0,
    httpOnly: true,
    sameSite: true,
    secure:
      NodeStatus.env === 'development' || NodeStatus.env === 'test'
        ? undefined
        : true
  })
}
export default deleteCookies
