/* eslint-disable */
enum ErrorResponse {
  // No existentes
  UserNotFound = 'Usuario Inexistente',
  PlanNotFound = 'Plan Inexistente',
  GymNotFound = 'Gimnasio Inexistente',
  // Incorrectos
  IncorrectPassword = 'Contraseña Incorrecta',
  // Desabilitados
  UserSuspended = 'Usuario Suspendido',
  UserNotVerified = 'Cuenta no verificada',
  // Prohibiciones
  UserNotAllow = 'No puedes realizar esta accion'
}
export default ErrorResponse
