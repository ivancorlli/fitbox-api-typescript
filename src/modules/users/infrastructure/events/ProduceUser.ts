import { Partitioners } from 'kafkajs'
import { kafka } from '../../../../config/config'

type Message = Buffer | string | null

class ProduceUser {
  private static readonly _Producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
  })

  static async newUser(msg: Message) {
    await ProduceUser._Producer.connect()
    await ProduceUser._Producer.send({
      topic: 'notification.fct_user-created.user.0',
      messages: [{ value: msg }]
    })
    await ProduceUser._Producer.disconnect()
  }

  static async changeEmail(msg: Message) {
    await ProduceUser._Producer.connect()
    await ProduceUser._Producer.send({
      topic: 'notification.fct_email-updated.user.0',
      messages: [{ value: msg }]
    })
    await ProduceUser._Producer.disconnect()
  }

  static async forgotPassword(msg: Message) {
    await ProduceUser._Producer.connect()
    await ProduceUser._Producer.send({
      topic: 'notification.cmd_update-password.user.0',
      messages: [{ value: msg }]
    })
    await ProduceUser._Producer.disconnect()
  }
}

export default ProduceUser
