import HashRepository from '../../../domain/repository/HashRepository'
import bcrypt from 'bcrypt'

class BcryptRepository implements HashRepository {
  private readonly _Bcrypt = bcrypt
  createHash(toHash: string) {
    const newHash = this._Bcrypt.hash(toHash, 10)
    return newHash
  }

  compareHash(hash: string, compared: string) {
    const comparedHash = this._Bcrypt.compare(compared, hash)
    return comparedHash
  }
}
export default BcryptRepository
