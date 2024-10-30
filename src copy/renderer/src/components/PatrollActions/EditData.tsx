
import { Button } from '../ui/button'
import { ChevronRight, FileSliders } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '../ui/dialog'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger} from '../ui/menubar'
import { Patrol } from '@/types/patroll'
import { useContext, useRef } from 'react'
import { erase_ronda, update_ronda_service } from '@/utils/SOCKET'
import { SocketContext } from '@/hooks/useSocket'


export function EditData(data:Patrol) {

  const cancelREF = useRef<HTMLButtonElement|null>(null)
  const {socket} = useContext(SocketContext)!

  const handleDelete = async () =>{
    erase_ronda(socket, data.id as string)
  }

  const handleComplete = async () => {
    update_ronda_service(socket, data.id as string, {finish: true})
  };

  const handlePayment = async () =>{
    update_ronda_service(socket, data.id as string, {payed: true})
  }


  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <ChevronRight />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle>{data.id}</DialogTitle>
        </DialogHeader>
          <div className='flex flex-col gap-2 '>
            <div className='flex flex-col hover:bg-primary-foreground gap-2 border p-1 rounded'>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Data de criação:</strong></span>
                <span className='text-xs'>{data.createdAt}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Criado por:</strong></span>
                <span className='text-xs'>{data.creator.username && data.creator.id}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Nome do ronda:</strong></span>
                <span className='text-xs'>{data.ronda.name}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Nome do condominio:</strong></span>
                <span className='text-xs'>{data.condominum}</span>
              </div>

              <div className='flex gap-1'>
                <span className='text-xs'><strong>Valor transporte ida:</strong></span>
                <span className='text-xs'>{data.going}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Valor transporte volta:</strong></span>
                <span className='text-xs'>{data.coming}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Horario de inicio:</strong></span>
                <span className='text-xs'>{data.createdAt}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Horario de fim:</strong></span>
                <span className='text-xs'>{data.createdAt}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Total de horas:</strong></span>
                <span className='text-xs'>1 hora</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Valor total:</strong></span>
                <span className='text-xs'>{data.total}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Status do pagamento:</strong></span>
                <span className='text-xs'>{data.payed ? "Pagamento efetuado":"Pagamento pendente"}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Status do serviço:</strong></span>
                <span className='text-xs'>{data.finish ? "Serviço finalizado":"Serviço em andamento"}</span>
              </div>
              <div className='flex gap-1'>
                <span className='text-xs'><strong>Última atualização:</strong></span>
                <span className='text-xs'>{data.updater.username||""}</span>
              </div>
            </div>
          </div>
        <DialogFooter className='w-full pt-2'>
          <div className='flex w-full justify-between items-center'>
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
            <DialogClose ref={cancelREF} className='hidden'>Fechar</DialogClose>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className='cursor-pointer p-1 py-1 border-none outline-none'>
                  <FileSliders strokeWidth={1.5}/>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem disabled={data.finish} className='cursor-pointer hover:bg-blue-500 hover:text-white' onClick={handleComplete}>Concluir serviço</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem disabled={data.payed} className='cursor-pointer hover:bg-blue-500 hover:text-white' onClick={handlePayment}>Concluir pagamento</MenubarItem>
                  <MenubarItem disabled={!data.payed || !data.finish} className='cursor-pointer hover:bg-blue-500 hover:text-white'>Enviar para o ROSSI</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
