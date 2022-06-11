import UserAuth from '../../domain/entity/UserAuth'

declare global {
  namespace Express {
    interface Request {
      user: UserAuth
    }
  }
}
