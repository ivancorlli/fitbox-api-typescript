import express from 'express'
import handleError from '../infrastructure/middleware/handleError'
import AllRoutes from '../infrastructure/routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { CookieConfig } from '../config/config'
import deserializeUser from '../infrastructure/middleware/deserializeUser'

class Server {
  private readonly _port: number
  private readonly _app = express()

  constructor(port: number) {
    this._port = port
    this._app.use(helmet())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.json())
    this._app.use(cookieParser(CookieConfig.sign))
    this._app.use(cors())
    this._app.use(deserializeUser)
    this._app.use('/v1', AllRoutes)
    this._app.use(handleError)
  }

  listen() {
    this._app.listen(this._port, () =>
      console.log(`Server Running on ${this._port}`)
    )
  }
}

export default Server
