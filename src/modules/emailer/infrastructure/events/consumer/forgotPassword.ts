import { kafka } from '../../../../../config/config'
import CryptRepository from '../../../../../shared/utils/encrypt'
import TokenRepository from '../../../../../shared/utils/token'
import TokenAge from '../../../../../shared/utils/TokenAge'
import Emailer from '../../../application/Emailer'
import DbEmail from '../../DbEmail'

const _Crypt = new CryptRepository()
const _Token = new TokenRepository()
const _Email = new DbEmail()

async function forgotPassword() {
  const _Consumer = kafka.consumer({ groupId: 'password' })
  await _Consumer.connect()
  await _Consumer.subscribe({
    topic: 'notification.cmd_update-password.user.0',
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

      // Encriptamos los datos
      const encripted = await _Crypt.encrypt({ uid: userFound.uid })
      // Creamos un nuevo token para verificar la informacion enviada
      const newToken = await _Token.newToken(encripted, TokenAge['1Hora'])

      const lEmailer = new Emailer(_Email)
      await lEmailer.recoverPassword(userFound.email, newToken)
    }
  })
}
export default forgotPassword
