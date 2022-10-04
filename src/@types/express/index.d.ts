import IAccess from '../../modules/access/domain/IAccess'

declare global {
  namespace Express {
    interface Request {
      User: {
        uid: string
        sid: string
        account: {
          email: string
          username: string
          status: string
          verified: boolean
        }
      }
      Gym: {
        gid: string
        sid: string
        account: {
          email: string
          username: string
          status: string
          verified: boolean
        }
        access: IAccess[]
      }
    }
  }
}
