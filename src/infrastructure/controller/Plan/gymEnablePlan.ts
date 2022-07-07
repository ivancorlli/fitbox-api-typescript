import { NextFunction, Request, Response } from 'express'
import EnablePlan from '../../../application/use-case/plan/EnablePlan'
import DbPlanRepository from '../../mongo/repository/DbPlanRepository'

async function gymEnablePlan(req: Request, res: Response, next: NextFunction) {
  // Instanciamos repositorio de PLAN
  const _Plan = new DbPlanRepository()
  // Instanciamos caso de uso HABILITAR PLAN
  const enablePlan = new EnablePlan(_Plan)
  try {
    // Obtenemos el id del GIMNASIO
    const { uid } = req.user
    // Obtenemos id del PLan a habilitar
    const { planId } = req.params
    // HABILITAMOS PLAN
    await enablePlan.start(planId, uid)
    return res.status(201).send({ ok: true, message: 'Plan habilitado' })
  } catch (err) {
    return next(err)
  }
}

export default gymEnablePlan
