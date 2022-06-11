import { NextFunction, Request, Response } from 'express'
import Error from '../../domain/entity/Error'

async function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err.code) {
    return res.status(500).send({ ok: false, err })
  }
  return res.status(err.code).send({ ok: false, message: err.message })
}
export default handleError
