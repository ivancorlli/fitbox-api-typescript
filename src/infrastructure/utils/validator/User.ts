import { z } from 'zod'

const User = z.object({
  email: z
    .string({
      required_error: 'Es necesario enviar un email',
      invalid_type_error: 'Formato Incorrecto'
    })
    .email({ message: 'El email es invalido' })
    .min(5, { message: 'El email debe tener al menos 5 caracteres' })
    .max(25, { message: 'El numero maximo de caractertes es 25' }),
  password: z
    .string({
      required_error: 'Es necesario enviar una contraseña',
      invalid_type_error: 'Formato Incorrecto'
    })
    .min(5, { message: 'La contraseña debe tener al menos 5 caracteres' })
    .max(15, { message: 'El numero maximo de caracteres es 15' })
})
export default User
