import { Queue } from 'bullmq'
import { RedisConfig } from '../../config/config'
import CommandNames from '../../domain/object-value/CommandNames'
// Instnaciar conneccion con redis
const connection = RedisConfig.connection

const NewUser = new Queue(CommandNames.NewUser, {
  connection
})

const ForgotPassword = new Queue(CommandNames.ForgotPassword, { connection })
const NewPlan = new Queue(CommandNames.NewPlan, { connection })
const NewSuscription = new Queue(CommandNames.NewSuscription, { connection })

const Command = {
  NewUser,
  ForgotPassword,
  NewPlan,
  NewSuscription
}
export default Command
