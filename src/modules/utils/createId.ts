import { v4 } from 'uuid'

function createId(): string {
  const id = v4()
  return id
}

export default createId
