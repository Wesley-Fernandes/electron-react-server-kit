import type { Express, Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const routes = (APP: Express) => {
  APP.get('/', (_req: Request, res: Response): void => {
    res.status(200).json({ online: true })
  })
}

export default routes
