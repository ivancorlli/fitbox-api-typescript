import User from './User'

export interface GymProfile {
  name: string
  trainings: Array<string>
  description: string
  profileImage: string
}
export interface GymDirection {
  country: string
  city: string
  state: string
  street: string
  streetNumber: number
  postalCode: number
}
export interface GymPhone {
  areaCode: number
  phoneNumber: number
}

export interface GymConfiguration {
  turnsCapacity: number
  requireMedicalRecord: boolean
}

export interface RegiteredCustomer {
  date: Date | number | string
  customerId: string
}

interface Gym extends User {
  profile: GymProfile
  direction: GymDirection
  phone: GymPhone
  configuration: GymConfiguration
  registeredCustomers: Array<RegiteredCustomer>
}
export default Gym
