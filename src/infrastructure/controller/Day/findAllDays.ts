import { NextFunction, Request, Response } from 'express'
import WeekDays from '../../../domain/object-value/WeekDays'

async function findAllDays(req: Request, res: Response, next: NextFunction) {
  try {
    // Buscamos todos los gimansios
    const response: Array<WeekDays> = [
      WeekDays.Monday,
      WeekDays.Tuesday,
      WeekDays.Wednesday,
      WeekDays.Tuesday,
      WeekDays.Friday,
      WeekDays.Saturday,
      WeekDays.Sunday
    ]
    return res.status(200).send({ ok: true, response })
  } catch (err) {
    return next(err)
  }
}
export default findAllDays
