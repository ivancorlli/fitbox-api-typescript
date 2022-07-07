import { WeekDays } from '../object-value/WeekDays'
import { PlanStatus } from '../object-value/PlanStatus'

interface Plan {
  _id: string
  name: string
  description?: string
  price: number
  weekDays: Array<WeekDays>
  status: PlanStatus
  gymOwner: string
}
export default Plan
