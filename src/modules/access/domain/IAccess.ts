import { reference } from '../../../shared/utils/CommonTypes'

interface IAccess {
  uuid: string
  uid?: reference
  gid: reference
  role: string
  timestamps: {
    created: number
    updated: number
  }
}

export default IAccess
