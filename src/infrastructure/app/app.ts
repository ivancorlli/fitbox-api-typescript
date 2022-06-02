import express from 'express'
import { routes } from '../routes'

class Server {
  private readonly _port: number
  private readonly _app = express()

  constructor(port: number) {
    this._port = port
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.json())
    this._app.use('/v1', routes)
  }

  listen() {
    this._app.listen(this._port, () => console.log('Server Running'))
  }
}

export default Server
