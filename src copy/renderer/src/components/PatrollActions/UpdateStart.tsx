
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
import { useContext, useRef } from 'react'
import { SocketContext } from '@/hooks/useSocket'
import { Input } from '../ui/input'
import { DialogDescription } from '@radix-ui/react-dialog'

interface Props{
  id: string
}
export function UpdateStart({id}:Props) {

  const cancelREF = useRef<HTMLButtonElement|null>(null)
  const {socket} = useContext(SocketContext)!

  const handleUpdate = async () =>{
    
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-48 cursor-pointer hover:bg-blue-500 hover:text-white">Atualizar valor da ida</Button>
      </DialogTrigger>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle>Atualizar valor R$</DialogTitle>
          <DialogDescription>Você está atualizando o valor de transporte ida</DialogDescription>
        </DialogHeader>
          <div className='flex flex-col gap-2 '>
              <Input type='text' placeholder='Valor da transporte (idá)'/>
          </div>
        <DialogFooter className='w-full pt-2'>
          <DialogClose ref={cancelREF}/>
          <Button>Atualizar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
