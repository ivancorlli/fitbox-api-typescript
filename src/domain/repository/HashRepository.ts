interface HashRepository {
  createHash: (toHash: string) => Promise<string>
  compareHash: (hash: string, compared: string) => Promise<Boolean>
}
export default HashRepository
