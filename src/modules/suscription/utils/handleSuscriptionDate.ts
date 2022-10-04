import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import CustomError from '../../error/CustomError'
dayjs.extend(utc)

function handleSuscriptionDate(type: string): {
  start: string
  expiration: string
} {
  if (!type) {
    throw CustomError.internalError(
      'Se produjo un error en el modulo suscripcion'
    )
  }

  // Fecha de inicio
  const start = dayjs.utc()
  let expiration
  switch (type) {
    case 'annual':
      expiration = dayjs.utc(start).add(1, 'year')
      break
    case 'biannual':
      expiration = dayjs.utc(start).add(6, 'month')
      break
    case 'quarterly':
      expiration = dayjs.utc(start).add(4, 'month')
      break
    case 'bimonthly':
      expiration = dayjs.utc(start).add(2, 'month')
      break
    case 'monthly':
      expiration = dayjs.utc(start).add(1, 'month')
      break
    case 'fortnight':
      expiration = dayjs.utc(start).add(15, 'day')
      break
    case 'weekly':
      expiration = dayjs.utc(start).add(1, 'week')
      break
    case 'unique':
      expiration = dayjs.utc(start).add(1, 'day')
      break
    case 'free':
      expiration = dayjs.utc(start).add(5, 'day')
      break
    default:
      expiration = dayjs.utc(start).add(1, 'month')
  }

  console.log(start)
  return {
    start: start.format('YYYY-MM-DD'),
    expiration: expiration.format('YYYY-MM-DD')
  }
}

export default handleSuscriptionDate
