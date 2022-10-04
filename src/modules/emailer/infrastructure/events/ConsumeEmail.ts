import changeEmail from './consumer/changeEmail'
import newSuscription from './consumer/newSuscription'
import forgotPassword from './consumer/forgotPassword'
import newUser from './consumer/newUser'

async function consumeEmail() {
  await newUser()
  await changeEmail()
  await forgotPassword()
  await newSuscription()
}

export default consumeEmail
