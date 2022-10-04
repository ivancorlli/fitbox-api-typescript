import { kafka } from '../../../../../config/config'
import CryptRepository from '../../../../../shared/utils/encrypt'
import TokenRepository from '../../../../../shared/utils/token'
import TokenAge from '../../../../../shared/utils/TokenAge'
import Emailer from '../../../application/Emailer'
import DbEmail from '../../DbEmail'

const _Crypt = new CryptRepository()
const _Token = new TokenRepository()
const _Emailer = new DbEmail()

async function changeEmail() {
  const _Consumer = kafka.consumer({ groupId: 'send-email' })
  await _Consumer.connect()
  await _Consumer.subscribe({
    topic: 'notification.fct_email-updated.user.0',
    fromBeginning: true
  })

  await _Consumer.run({
    eachMessage: async ({ message }) => {
      interface user {
        uid: string
        email: string
      }

      const msg = message.value!.toString()
      const userFound: user = JSON.parse(msg)

      let randomDigit: number
      do {
        // ! El numero si o si tiene que estar entre 100.000 y 1.000.000
        // ! Es la manera para que el numero resultante sea de 6 cifras
        randomDigit = Math.floor(Math.random() * 1000000)
      } while (randomDigit < 100000 && randomDigit < 1000000)

      // Encriptamos el id del usuario y el codigo de validacion
      const encripted = _Crypt.encrypt({
        uid: userFound.uid,
        code: randomDigit
      })
      // Creamos el token de verificacion
      const newToken = await _Token.newToken(encripted, TokenAge['24Horas'])
      // Creamos email
      const lEmail = new Emailer(_Emailer)
      // Enviamos email de confirmacion
      await lEmail.confirm(userFound.email, randomDigit, newToken)
    }
  })
}

export default changeEmail
