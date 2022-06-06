import Server from '../app'
import MongoDb from '../database'

class App {
  static async startOn() {
    try {
      const newServer = new Server(5000)
      const url = 'mongodb://localhost/fitmanager-api--dev'
      await newServer.listen()
      await MongoDb.startDatabase(url)
    } catch (err) {
      console.log(`\x1b[35m  ${err}  \x1b[37m`)
    }
  }
}

App.startOn()