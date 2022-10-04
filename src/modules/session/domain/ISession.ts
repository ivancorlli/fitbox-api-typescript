import { reference } from '../../../shared/utils/CommonTypes'

interface ISession {
  uuid: string
  uid: reference
  type: string
  gid?: reference
  access?: reference[]
  timestamps: {
    created: number
    updated: number
  }
}
export default ISession
