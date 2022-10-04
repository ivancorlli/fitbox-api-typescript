import { reference } from '../../../shared/utils/CommonTypes'

interface IPlan {
  uuid: string
  gid: reference
  name: string
  description?: string
  price: number
  days: number
  status: string
  type:string
  timestamps: {
    created: number
    updated: number
  }
}
export default IPlan
