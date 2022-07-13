import { NextFunction, Request, Response } from 'express'
import EnablePlan from '../../../application/use-case/plan/EnablePlan'
import DbPlan from '../../db/DbPlan'

async function enablePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de PLAN
  const _Plan = new DbPlan()
  // Instanciamos caso de uso HABILITAR PLAN
  const enablePlan = new EnablePlan(_Plan)
  try {
    // Obtenemos el id del GIMNASIO
    const { uid } = req.user
    // Obtenemos id del PLan a habilitar
    const { id } = req.params
    // HABILITAMOS PLAN
    await enablePlan.start(id, uid)
    return res.status(201).send({ ok: true, message: 'Plan habilitado' })
  } catch (err) {
    return next(err)
  }
}

export default enablePlan
