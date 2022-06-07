'use strict'
const __importDefault = (this && this.__importDefault) || function(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const routes_1 = require('../routes')
class Server {
  constructor(port) {
    this._app = (0, express_1.default)()
    this._port = port
    this._app.use(express_1.default.urlencoded({ extended: true }))
    this._app.use(express_1.default.json())
    this._app.use('/v1', routes_1.routes)
  }

  listen() {
    this._app.listen(this._port, () => console.log('Server Running'))
  }
}
exports.default = Server
