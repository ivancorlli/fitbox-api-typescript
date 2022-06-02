import mongoose from 'mongoose'

class MongoDb {
  static async startDatabase(url: string) {
    try {
      const db = await mongoose.connect(url, { keepAlive: true })
      console.log(`\x1b[35m Database Connected on ${url}  \x1b[37m`)
      return db
    } catch (err) {
      if (err) {
        throw err
      }
    }
  }
}

export default MongoDb
