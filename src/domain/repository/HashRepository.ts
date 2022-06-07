interface HashRepository {
  createHash: (toHash: string) => Promise<string>
  compareHash: (compared: string, hash: string) => Promise<Boolean>
}
export default HashRepository
