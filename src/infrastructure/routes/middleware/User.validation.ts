import { NextFunction, Request, Response } from 'express'
import { QueryType } from '../../../domain/object-value/QueryType'
import User from '../../utils/validator/User'

class UserValidator {
  private readonly _User = User
  async userRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.safeParse(req.body)
      if (!result.success) {
        const errors = result.error.issues.map((el) => el.message)
        throw errors
      }
      const { email, password } = req.body
      req.body.email = email.toLowerCase().trim()
      req.body.password = password.trim()
      next()
    } catch (err) {
      return res.status(403).send({ ok: false, message: err })
    }
  }

  async userQueryValidation(req: Request, res: Response, next: NextFunction) {
    const { type } = req.query
    if (type === QueryType.Gym || type === QueryType.Client) {
      return next()
    }
    return res.status(400).send({ ok: false, message: 'Parametro Incorrecto' })
  }
}

export default UserValidator
