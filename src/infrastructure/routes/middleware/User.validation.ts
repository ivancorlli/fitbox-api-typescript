import { NextFunction, Request, Response } from 'express'
import { QueryUserType } from '../../../domain/object-value/QueryUserType'
import User from '../../utils/validator/User'

class UserValidator {
  async userRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await User.safeParse(req.body)
      if (!result.success) {
        const errors = result.error.errors.map((el) => el.message)
        throw errors[0]
      }
      return next()
    } catch (err) {
      return res.status(403).send({ ok: false, message: err })
    }
  }

  async userQueryValidation(req: Request, res: Response, next: NextFunction) {
    const { type } = req.query
    if (type === QueryUserType.Gym || type === QueryUserType.Client) {
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
        const errors = result.error.errors.map((el) => el.message)
        throw errors[0]
      }
      result = await passwordSchema.safeParse({ password: newPassword })
      if (!result.success) {
        const errors = result.error.errors.map((el) => el.message)
        throw errors[0]
      }
      req.body.oldPassword = oldPassword.trim()
      req.body.newPassword = newPassword.trim()
      return next()
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
        const errors = result.error.errors.map((el) => el.message)
        throw errors[0]
      }
      req.body.newEmail = newEmail.toLowerCase().trim()
      return next()
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
        const errors = result.error.errors.map((el) => el.message)
        throw errors[0]
      }
      req.body.email = email.toLowerCase().trim()
      return next()
    } catch (err) {
      return res.status(400).send({ ok: false, message: err })
    }
  }
}

export default UserValidator
