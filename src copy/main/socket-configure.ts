import { DefaultEventsMap, Server, Socket } from 'socket.io'
import database from './prisma'

const socketConfig = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected')

    socket.emit('hello', 'You connected')

    socket.on('try-success', () => {
      socket.emit('success', 'Mensagem de teste aceita.')
    })

    socket.on('try-error', () => {
      socket.emit('error', 'Mensagem de erro aceita.')
    })

    socket.on('create-ronda', async (data) => {
      await database.ronda
        .create({ data })
        .then(() => {
          socket.emit('success', 'Sucesso ao criar ronda')
        })
        .catch((err) => {
          console.error(err)
          socket.emit('error', 'Falha ao salvar ronda')
        })
    })

    socket.on('get-all-rondas', async () => {
      try {
        const datas = await database.ronda.findMany()
        socket.emit('receive-all-rondas', datas)
      } catch (error) {
        console.error(error)
        socket.emit('error-response', 'Falha ao recuperar rondas')
      }
    })
  })
}

export default socketConfig
