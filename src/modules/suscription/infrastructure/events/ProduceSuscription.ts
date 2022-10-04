import { Partitioners } from 'kafkajs'
import { kafka } from '../../../../config/config'

type Message = Buffer | string | null

class ProduceSuscription {
  private static readonly _Producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
  })

  static async newSuscription(msg: Message) {
    await ProduceSuscription._Producer.connect()
    await ProduceSuscription._Producer.send({
      topic: 'notification.fct_suscription-created.suscription.0',
      messages: [{ value: msg }]
    })
    await ProduceSuscription._Producer.disconnect()
  }
}

export default ProduceSuscription
