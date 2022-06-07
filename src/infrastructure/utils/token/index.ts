import JWT from 'jsonwebtoken'
import 'dotenv/config'

interface TokenRepo {
  createLoginToken: (payload: string | object) => Promise<string>
  verifyLoginToken: (token: string) => Promise<object>
}

class TokenRepository implements TokenRepo {
  private readonly _Token = JWT
  async createLoginToken(payload: object | string) {
    const newToken = await this._Token.sign(
      payload,
      process.env.PRIVATE_SECRET!,
      {
        expiresIn: 1000,
        algorithm: 'RS256'
      }
    )
    return newToken
  }

  async verifyLoginToken(token: string) {
    const verifyToken = await this._Token.verify(
      token,
      process.env.PRIVATE_SECRET!
    )
    return {
      tokenData: verifyToken
    }
  }
}
export default TokenRepository
