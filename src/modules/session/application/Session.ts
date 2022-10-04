// import ISession from '../../domain/entity/ISession'

import CustomError from '../../error/CustomError'
import createId from '../../utils/createId'
import ISession from '../domain/ISession'
import SessionRepository from '../domain/SessionRepository'

class Session {
  private readonly S: SessionRepository

  constructor(sessionRepo: SessionRepository) {
    this.S = sessionRepo
  }

  /*
  ////////////////////////////////////////
  Metodos
  ////////////////////////////////////////
  */

  /**
   * iCorlli: 13-8-2022 ✅ \
   * Crea una nueva session de usuario
   * @param userId id del ususario que crea la esession
   * @returns Nueva sesion
   */
  async createUserSession(userId: string): Promise<ISession> {
    // Validamos los datos
    const today = new Date().getTime()
    const created: ISession = {
      uuid: createId(),
      uid: userId,
      type: 'FITMANAGER@PERSON-SESSION',
      timestamps: {
        created: today,
        updated: today
      }
    }
    // creamos una nueva session
    const newSession = await this.S.create(created)

    return newSession
  }

  /**
   * iCorlli: 13-8-2022 ✅ \
   * Crea una nueva session de gimnasio
   * @param userId id del ususario que crea la esession
   * @param gymId id del gimnasio asociado
   * @param access access del usuario
   * @returns Nueva sesion
   */
  async createGymSession(
    userId: string | undefined,
    gymId: string,
    access: any
  ): Promise<ISession> {
    // Validamos los datos
    const today = new Date().getTime()
    const created: ISession = {
      uuid: createId(),
      uid: userId,
      type: 'FITMANAGER@GYM-SESSION',
      gid: gymId,
      access,
      timestamps: {
        created: today,
        updated: today
      }
    }
    // creamos una nueva session
    const newSession = await this.S.create(created)

    return newSession
  }

  /**
   * iCorlli: 13-8-2022 ✅ \
   * Eliminar la session por su id
   * @param id id de la session a eliminar
   * @returns Session eliminada
   */
  async deleteById(id: string) {
    // Validamos los datos
    this.validateId(id)
    // Eliminamos la session por su id
    const sessionDeleted = await this.S.deleteById(id)
    // si no hay sesion, arrojamos error
    if (!sessionDeleted) {
      throw CustomError.internalError('Error al cerrar session')
    }
    return sessionDeleted
  }

  private validateExistence(session: ISession): ISession {
    // Arrojamos error si no recibimos plan
    if (!session) {
      throw CustomError.notFound('Sesion inexistente')
    }
    return session
  }

  private validateId(id: string) {
    // Arrojar error si no recibimos id
    if (!id) {
      throw CustomError.internalError('Se produjo un error interno')
    }
  }
}

export default Session
