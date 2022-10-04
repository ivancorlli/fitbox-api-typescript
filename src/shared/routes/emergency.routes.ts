import { Router } from 'express'
import deleteContact from '../../modules/emergency/infrastructure/controller/deleteContact'
import getContact from '../../modules/emergency/infrastructure/controller/getContact'
import getUserContacts from '../../modules/emergency/infrastructure/controller/getUserContacts'
import newContact from '../../modules/emergency/infrastructure/controller/newContact'
import updateContact from '../../modules/emergency/infrastructure/controller/updateContact'

const EmergencyRouter = Router()

// Nuevo usuario
EmergencyRouter.get('/contacts', getUserContacts)
EmergencyRouter.delete('/', deleteContact)
EmergencyRouter.patch('/', updateContact)
EmergencyRouter.get('/', getContact)
EmergencyRouter.post('/', newContact)
export default EmergencyRouter
