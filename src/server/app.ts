import express from 'express'
import handleError from '../infrastructure/middleware/handleError'
import AllRoutes from '../infrastructure/routes'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

class Server {
  private readonly _port: number
  private readonly _app = express()

  constructor(port: number) {
    this._port = port
    this._app.use(helmet())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.json())
    this._app.use(cookieParser())
    this._app.use(cors())

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
