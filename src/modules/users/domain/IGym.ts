import IUserBase from './IUser'

interface IGym extends IUserBase {
  profile: {
    name: string | null
    trainings: string[]
    biography: string | null
  }
  direction: {
    country: string | null
    city: string | null
    state: string | null
    postalCode: string | null
    street: string | null
    streetNumber: number | null
  }
}

export default IGym
