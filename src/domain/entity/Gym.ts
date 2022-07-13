import User from './User'

export interface GymProfile {
  name: string
  trainings: Array<string>
  description: string
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

interface Gym extends User {
  profile: GymProfile
  direction: GymDirection
  phone: GymPhone
  configuration: GymConfiguration
}
export default Gym
