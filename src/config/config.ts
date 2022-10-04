import 'dotenv/config'
import { Kafka } from 'kafkajs'

// * Configuraciones del servidor
export const NodeStatus = {
  env: process.env.NODE_ENV
}
export const ServerConfig = {
  port: parseInt(process.env.PORT!),
  dataBase: process.env.DB
}
// ----------------------------- //
// * Configuracion de secrets para diferentes modulos
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
// ----------------------------- //
// * Configuracion de modulo emailer
export const EmailConfig = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}

export const kafka = new Kafka({
  clientId: 'fitmanager',
  brokers: ['localhost:9092']
})
