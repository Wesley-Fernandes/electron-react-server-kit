import { Patrol } from '@/types/patroll'
import { Socket } from 'socket.io-client'
import { toast } from 'sonner'

export const filter_ronda_services = (socket: Socket | null, date = new Date()) => {
  if (!socket) return []
  socket.emit('filter-rondas-services', date)
  return socket?.on('receive-all-rondas', (response: Patrol[]) => {
    return response
  })
}

export const get_ronda_service = (socket: Socket | null, id: string) => {
  if (!socket) return null
  socket.emit('get-ronda-service', { id })
  return socket?.on('send-ronda-service-response', (response: Patrol) => {
    console.log({ response })
    return response
  })
}

export const erase_ronda = (socket: Socket | null, id: string) => {
  if (!socket) {
    toast.success('Não existe SOCKET.')
    return
  }

  socket.emit('delete-ronda', id)
  socket?.on('delete-ronda-response', (status: Boolean) => {
    switch (status) {
      case true:
        toast.success('Ronda deletado com sucesso!')
        break
      case false:
        toast.success('Falha ao excluir a ronda!')
        break
    }
  })
}

export const create_ronda = (
  socket: Socket | null,
  name: string,
  cellphone: string,
  pix: string,
  address: string
) => {
  if (!socket) {
    toast.error('Não existe SOCKET.')
    return
  }

  if (name && cellphone && pix && address) {
    socket.emit('create-ronda', { name, cellphone, pix, address })

    socket.on('create-ronda-response', (status: boolean) => {
      if (status) {
        toast.success('Ronda criada com sucesso!')
        return
      } else {
        toast.error('Falha ao criar a ronda!')
        return
      }
    })
  } else {
    toast.error('Todos os campos são obrigatórios!')
    return
  }
}

export const update_ronda_service = (
  socket: Socket | null,
  id: string,
  data: Record<string, any>
) => {
  if (!socket) {
    toast.error('Não existe SOCKET.')
    return
  }

  socket.emit('update-ronda-service', { id, data })

  socket.on('update-ronda-service-response', (response: { success: boolean; message: string }) => {
    if (response.success) {
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
  })
}
