import { NextFunction, Request, Response } from 'express'
import { QueryType } from '../../../domain/object-value/QueryType'
import User from '../../utils/validator/User'

class UserValidator {
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

  async changeOldPassValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { oldPassword, newPassword } = req.body
    try {
      const passwordSchema = await User.pick({ password: true })
      let result = await passwordSchema.safeParse({ password: oldPassword })
      if (!result.success) {
        const error = result.error.issues[0].message
        throw error
      }
      result = await passwordSchema.safeParse({ password: newPassword })
      if (!result.success) {
        const error = result.error.issues[0].message
        throw error
      }
      req.body.oldPassword = oldPassword.trim()
      req.body.newPassword = newPassword.trim()
      next()
    } catch (err) {
      return res.status(400).send({ ok: false, message: err })
    }
  }

  async changeEmailValidation(req: Request, res: Response, next: NextFunction) {
    const { newEmail } = req.body
    try {
      const emailSchema = await User.pick({ email: true })
      const result = await emailSchema.safeParse({ email: newEmail })
      if (!result.success) {
        const error = result.error.issues[0].message
        throw error
      }
      req.body.newEmail = newEmail.toLowerCase().trim()
      next()
    } catch (err) {
      return res.status(400).send({ ok: false, message: err })
    }
  }

  async forgotPasswordValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email } = req.body
    try {
      const emailSchema = await User.pick({ email: true })
      const result = await emailSchema.safeParse({ email })
      if (!result.success) {
        const error = result.error.issues[0].message
        throw error
      }
      req.body.email = email.toLowerCase().trim()
      next()
    } catch (err) {
      return res.status(400).send({ ok: false, message: err })
    }
  }
}

export default UserValidator
