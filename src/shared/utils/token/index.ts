import JWT from 'jsonwebtoken'
import { AccessTokenSecret, NewTokenSecret } from '../../../config/config'
import CustomError from '../../../modules/error/CustomError'

interface TokenResponse {
  [key: string]: any
}

interface SessionToken {
  sid: string
  uid?: string
}

interface GymSessionToken {
  sid: string
  uid?: string
  gid?: string
}

interface AccessTokenResponse {
  payload: SessionToken | null
  expired: boolean
}

interface TokenRepo {
  createAccessToken: (
    payload: SessionToken,
    expiresIn: number
  ) => Promise<string>
  verifyAccessToken: (token: string) => Promise<TokenResponse | undefined>
}

class TokenRepository implements TokenRepo {
  private readonly _Token = JWT

  async createAccessToken(
    content: SessionToken,
    expiresIn: number
  ): Promise<string> {
    const newToken = await this._Token.sign(
      content,
      AccessTokenSecret.privateKey!,
      {
        expiresIn,
        algorithm: 'RS256'
      }
    )
    return newToken
  }

  async verifyAccessToken(
    token: string
  ): Promise<AccessTokenResponse | undefined> {
    try {
      // @ts-ignore
      const tokenVerified = await this._Token.verify(
        token,
        AccessTokenSecret.publicKey!
      )
      return {
        // @ts-ignore
        payload: tokenVerified,
        expired: false
      }
    } catch (err) {
      return {
        payload: null,
        expired: true
      }
    }
  }

  async createGymAccessToken(
    content: GymSessionToken,
    expiresIn: number
  ): Promise<string> {
    const newToken = await this._Token.sign(
      content,
      AccessTokenSecret.privateKey!,
      {
        expiresIn,
        algorithm: 'RS256'
      }
    )
    return newToken
  }

  async verifyGymAccessToken(
    token: string
  ): Promise<AccessTokenResponse | undefined> {
    try {
      // @ts-ignore
      const tokenVerified = await this._Token.verify(
        token,
        AccessTokenSecret.publicKey!
      )
      return {
        // @ts-ignore
        payload: tokenVerified,
        expired: false
      }
    } catch (err) {
      return {
        payload: null,
        expired: true
      }
    }
  }

  async newToken(payload: string, expiresIn: number): Promise<string> {
    const newToken = await this._Token.sign(
      { payload },
      NewTokenSecret.secret!,
      {
        expiresIn,
        algorithm: 'HS256'
      }
    )
    return newToken
  }

  async verifyToken(token: string): Promise<TokenResponse | undefined> {
    try {
      // @ts-ignore
      const { payload } = await this._Token.verify(
        token,
        NewTokenSecret.secret!
      )
      if (!payload) throw new Error()
      return {
        payload,
        expired: false
      }
    } catch (err) {
      if (err) {
        throw CustomError.unauthorized('No estas autorizado')
      }
    }
  }
}
export default TokenRepository
