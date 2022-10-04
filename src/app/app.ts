import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { CookieConfig } from '../config/config'
import AllRoutes from '../shared/routes'
import handleError from '../shared/middleware/handleError'
import morgan from 'morgan'

class Server {
  private readonly _port: number
  private readonly _app = express()

  constructor(port: number) {
    this._port = port
    this._app.use(morgan('dev'))
    this._app.use(helmet())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.json())
    this._app.use(cookieParser(CookieConfig.sign))
    this._app.use(
      cors({
        origin: 'http://localhost:3000'
      })
    )
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
