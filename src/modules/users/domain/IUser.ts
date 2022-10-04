import { reference } from '../../../shared/utils/CommonTypes'

interface IUser {
  uuid: string
  type?: string
  account: {
    email: string
    username: string
    password?: string
    status: string
    verified: boolean
  }
  direction: {
    country: string | null
    city: string | null
    state: string | null
    postalCode: string | null
  }
  contact: {
    areaCode: number | null
    phoneNumber: number | null
  }
  images: {
    profile: reference | null
    frontPage: reference | null
  }
  timestamps: {
    created: number
    updated: number
  }
}

export default IUser
