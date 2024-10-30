import type { Express } from 'express'
import cors from 'cors'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const config = (APP: Express) => {
  APP.use(cors())
}

export default config
