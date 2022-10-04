import Server from '../app'
import MongoDb from '../database'
import { NodeStatus, ServerConfig } from '../../config/config'
import consumers from '../../shared/events/consumers'

class App {
  static async startOn() {
    const port: number = ServerConfig.port
    const url: string = ServerConfig.dataBase!
    const env: string = NodeStatus.env!
    try {
      const newServer = new Server(port)
      console.log(`\x1b[36m Entorno === ${env}  \x1b[32m`)
      await newServer.listen()
      await MongoDb.startDatabase(url)
      await consumers()
    } catch (err) {
      console.log(`\x1b[35m  ${err}  \x1b[37m`)
    }
  }
}

App.startOn()
