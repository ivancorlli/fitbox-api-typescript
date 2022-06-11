import { CookieAge } from './CookieAge'

/* eslint-disable */
export const TokenAge = {
  // ! Siempre dividir por 1000, para qu sea equivalente al time de la cookie
  // ! Solo se utilizan con las cookies de access
  AccessToken: CookieAge.AccessCookie / 1000,
  RefreshToken: CookieAge.RefreshCookie / 1000,
  // * Otros Timer que no se utilizan para las cookies de access
  '1Hora': 60 * 60,
  '24Horas': 60 * 60 * 24
}
/* eslint-enable */
