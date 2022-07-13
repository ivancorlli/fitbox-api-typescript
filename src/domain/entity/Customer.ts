import Gender from '../object-value/Gender'
import User from './User'

export interface CustomerProfile {
  name: string
  surname: string
  gender: Gender
  birth: Date | string | number
  prfoileImage: string
}
export interface CustomerDirection {
  country: string
  city: string
  state: string
  postalCode: number
}
export interface CustomerPhone {
  areaCode: number
  phoneNumber: number
}

interface Customer extends User {
  profile: CustomerProfile
  direction: CustomerDirection
  phone: CustomerPhone
}
export default Customer
