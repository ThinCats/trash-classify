import fs from 'fs'
import path from 'path'

export default fs.readFileSync(
  path.resolve(__dirname, '../schemas/schema.graphql'),
  { encoding: 'utf8' }
)
