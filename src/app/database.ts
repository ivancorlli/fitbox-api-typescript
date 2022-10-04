import mongoose from 'mongoose'

class MongoDb {
  static async startDatabase(url: string) {
    try {
      const db = await mongoose.connect(url)
      console.log(
        `\x1b[35m Database Connected on ${db.connection.host}  \x1b[37m`
      )
      return db
    } catch (err) {
      if (err) {
        throw err
      }
    }
  }
}

export default MongoDb
