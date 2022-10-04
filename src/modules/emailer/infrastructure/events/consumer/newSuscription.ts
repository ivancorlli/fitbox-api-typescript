import { kafka } from '../../../../../config/config'

import Emailer from '../../../application/Emailer'
import DbEmail from '../../DbEmail'

const _Emailer = new DbEmail()

async function newSuscription() {
  const _Consumer = kafka.consumer({ groupId: 'Suscriptions-Email' })
  await _Consumer.connect()
  await _Consumer.subscribe({
    topic: 'notification.fct_suscription-created.suscription.0',
    fromBeginning: true
  })

  await _Consumer.run({
    eachMessage: async ({ message }) => {
      interface ISuscribers {
        email: string
      }

      const msg = message.value!.toString()
      const suscribers: ISuscribers = JSON.parse(msg)

      // Creamos email
      const lEmail = new Emailer(_Emailer)
      // Enviamos email de bienvenida
      await lEmail.welcome(suscribers.email)
    }
  })
}

export default newSuscription
