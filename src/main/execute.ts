import type { Express } from 'express'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const listen = (APP: Express) => {
  const PORT = 2000
  APP.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}

export default listen
