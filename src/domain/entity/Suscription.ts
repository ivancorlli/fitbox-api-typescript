import { PaymentType } from '../object-value/PaymentType'
import { SuscriptionStatus } from '../object-value/SuscriptionStatus'

interface Suscription {
  _id: string
  suscriptionNumber: number
  initDate: Date | string | number
  finishDate: Date | string | number
  status: SuscriptionStatus
  paymentType: PaymentType
  paymentTotal: number
  customer: string
  gym: string
  plan: string
}
export default Suscription
