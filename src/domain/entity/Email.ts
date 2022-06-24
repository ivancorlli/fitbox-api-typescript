interface Email {
  from: string
  to: string
  subject: string
  text?: string
  html?: string | Buffer
}
export default Email
