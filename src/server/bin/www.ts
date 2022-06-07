import Server from '../app'
import MongoDb from '../database'
import 'dotenv/config'

class App {
  static async startOn() {
    const port: number = parseInt(process.env.PORT!)
    const url: string = process.env.DB!
    try {
      const newServer = new Server(port)
      await newServer.listen()
      await MongoDb.startDatabase(url)
    } catch (err) {
      console.log(`\x1b[35m  ${err}  \x1b[37m`)
    }
  }
}

App.startOn()
