import consumeEmail from '../../modules/emailer/infrastructure/events/ConsumeEmail'

async function consumers() {
  try {
    await consumeEmail()
  } catch (err) {
    console.log(err)
  }
}

export default consumers
