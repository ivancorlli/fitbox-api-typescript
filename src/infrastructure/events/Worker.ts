import { Job, Worker } from 'bullmq'
import ForgotPassword from '../../application/job/ForgotPassword'
import NewUser from '../../application/job/NewUser'
import { RedisConfig } from '../../config/config'
import Emailer from '../utils/mail'

// Instanciamos coneccion a redis
const connection = RedisConfig.connection
// Instanciamos Repositorios de base dedatos

// Instanciamos repositorio de email
const _Emailer = new Emailer()

// Instanciamos repositorio de notificaciones

// Instanciamos Worker
let worker: Worker

// * Worker ejecutado en el momento que se registra el usuario
const newUser = new NewUser(_Emailer)
worker = new Worker(
  newUser.name,
  async (job: Job) => {
    if (job && job.data) {
      const { email, code, link } = job.data
      await newUser.handler(email, code, link)
    }
  },
  { connection }
)

// * Worker ejecutado en el momento de solicitar una nueva contrasenia
const forgotPassword = new ForgotPassword(_Emailer)
worker = new Worker(forgotPassword.name, async (job: Job) => {
  if (job && job.data) {
    const { email, link } = job.data
    await forgotPassword.handler(email, link)
  }
})
export default worker
