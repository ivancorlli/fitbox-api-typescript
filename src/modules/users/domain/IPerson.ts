import IUserBase from './IUser'

interface IPerson extends IUserBase {
  profile: {
    name: string | null
    surname: string | null
    gender: string | null
    birth: string | null
    biograpgy: string | null
  }
  medical: {
    allergies: string | null
    disabilities: string | null
    aptitude: string | null
  }
}

export default IPerson
