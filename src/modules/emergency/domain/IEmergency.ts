import { reference } from '../../../shared/utils/CommonTypes'

interface IEmergency {
  uuid: string
  emergencyOf: reference
  name: string
  surname: string
  gender: string
  relation: string
  areaCode: number
  phoneNumber: number
  timestamps: {
    created: number
    updated: number
  }
}

export default IEmergency
