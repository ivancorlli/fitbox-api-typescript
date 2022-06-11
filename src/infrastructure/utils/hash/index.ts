import HashRepository from '../../../domain/repository/HashRepository'
import bcrypt from 'bcrypt'

class BcryptRepository implements HashRepository {
  private readonly _Bcrypt = bcrypt
  async createHash(toHash: string) {
    const newHash = this._Bcrypt.hash(toHash, 10)
    return newHash
  }

  async compareHash(compared: string, hash: string) {
    const comparedHash = this._Bcrypt.compare(compared, hash)
    return comparedHash
  }
}
export default BcryptRepository
