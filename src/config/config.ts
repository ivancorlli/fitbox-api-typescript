import 'dotenv/config'

export const NodeStatus = {
  env: process.env.NODE_ENV
}

export const ServerConfig = {
  port: parseInt(process.env.PORT!),
  dataBase: process.env.DB
}

export const UserRoles = {
  gym: process.env.GYM_ROLE,
  client: process.env.CLIENT_ROLE
}

export const AccessTokenSecret = {
  privateKey: process.env.ACCESS_PRIVATE_KEY,
  publicKey: process.env.ACCESS_PUBLIC_KEY
}

export const NewTokenSecret = {
  secret: process.env.NEW_TOKEN_SECRET
}

export const EncryptSecret = {
  secret: process.env.ENCRYPT_SECRET
}

export const CookieConfig = {
  sign: process.env.COOKIE_SIGNED
}
