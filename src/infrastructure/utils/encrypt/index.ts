import crypto from 'crypto-js'
import { EncryptSecret } from '../../../config/config'
import CustomError from '../../../domain/exception/CustomError'

interface EncryptResponse {
  [key: string]: any
}

class CryptRepository {
  private readonly _Crypto = crypto
  encrypt(toEncrypt: string | object) {
    const newEncrypted = this._Crypto.AES.encrypt(
      JSON.stringify({ content: toEncrypt }),
      EncryptSecret.secret!
    ).toString()
    return newEncrypted
  }

  decrypt(crypted: string): EncryptResponse | never {
    const newDecrypted: null | string = this._Crypto.AES.decrypt(
      crypted,
      EncryptSecret.secret!
    ).toString(this._Crypto.enc.Utf8)
    if (!newDecrypted || newDecrypted.length < 1 || newDecrypted === null) {
      throw CustomError.unauthorized('No estas autorizado')
    }
    const string = JSON.parse(newDecrypted).content

    return string
  }
}
export default CryptRepository
