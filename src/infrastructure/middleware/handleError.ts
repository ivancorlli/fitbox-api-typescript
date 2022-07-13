import { NextFunction, Request, Response } from 'express'
import { Error } from 'mongoose'
import CustomError from '../../domain/entity/Error'

async function handleError(
  err: CustomError & Error,
  req: Request,
  res: Response,
  /* eslint-disable */
  next: NextFunction
  /* eslint-enable */
) {
  if (err.name === 'ValidationError') {
    const response = err.message.split(':')
    return res.status(500).send({ ok: false, messaage: response[2] })
  }
  if (!err.code) {
    return res.status(500).send({ ok: false, messaage: err })
  }
  return res.status(err.code).send({ ok: false, message: err.message })
}
export default handleError
