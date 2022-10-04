import { reference } from '../../../shared/utils/CommonTypes'

interface ISuscription {
  uuid: string
  suscriptionNr: number
  start: Date | string | number
  expiration: Date | string | number
  status: string
  paymentType: string
  paymentTotal: number
  isNewSuscriber: boolean
  uid: reference
  gid: reference
  pid: reference
  timestamps: {
    created: number
    updated: number
  }
}
export default ISuscription
