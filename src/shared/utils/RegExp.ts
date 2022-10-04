/* eslint-disable */
const EmailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const UsernameRegExp = /^[a-zA-Z0-9][\w]*\.?[\w]*[a-zA-Z0-9]+$/
const NamesRegExp = /^[A-Za-z]+$/
const TextRegExp = /^[ A-Za-z]+$/
const DateRegExp = /^[+-]?\d{4,5}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ // YYYY-MM-DD
const PhoneNumberRegExp = /^[0-9]{6,12}$/
const DescriptionRegExp = /^[ A-Za-z0-9_@./:;'"()_%$#&+-]+$/
const PriceRegExp = /\d+(?:[.,]\d{0,2})?/
const DaysRegExp = /^[1-9]/
/* eslint-enable */
export {
  EmailRegExp,
  UsernameRegExp,
  TextRegExp,
  NamesRegExp,
  DateRegExp,
  PhoneNumberRegExp,
  DescriptionRegExp,
  PriceRegExp,
  DaysRegExp
}
