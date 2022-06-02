import User from './User'

interface Gym extends User {
  role: string
  profile: {
    name: string
  }
}

export default Gym
