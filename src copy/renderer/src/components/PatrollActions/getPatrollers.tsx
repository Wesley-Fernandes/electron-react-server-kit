
import { Button } from '../ui/button'
import { Edit, Headset, MapPin, Trash, UserSearch, WalletMinimal } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { useEffect, useState } from 'react'
import { Patroller } from '@/types/patroll'
import PATROLLER from '@/services/PATROLLER'

export function getPatrollers() {
  const [patrollers, setPatrollers] = useState<Patroller[]>([])

  useEffect(()=>{
    const handlePatrollers = async () =>{
     const data = await PATROLLER.list();
     setPatrollers(data);
    }
    handlePatrollers();
  }, [])

  const handleDelete = async(id: string) =>{
     await PATROLLER.erase(id);
     setPatrollers(patrollers.filter(p => p.id!== id));
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <UserSearch />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lista de rondas</DialogTitle>
          <DialogDescription>
            Adicionar, remover ou editar um ronda.
          </DialogDescription>
        </DialogHeader>
         <ul className='h-96 overflow-y-auto w-full'>
          {
            patrollers.map((patroller) => (
                <li className='flex w-full border p-1' key={patroller.id}>
                  <div className='flex flex-1 flex-col gap-1'>
                    <h1>{patroller.name}</h1>
                    <p className='text-xs opacity-70 flex items-center gap-1'><MapPin size={10} className='text-red-500'/>{patroller.address}</p>
                    <span className='text-xs opacity-70 flex items-center gap-1'><Headset size={10} className='text-blue-500'/>
                      <a href={`tel:${patroller.cellphone}`} className='hover:text-blue-500 hover:border-b border-b-blue-500'>{patroller.cellphone}</a>
                    </span>
                    <span className='text-xs opacity-70 flex items-center gap-1'>
                      <WalletMinimal size={10} className='text-green-500'/>
                      {patroller.pix}
                    </span>
                  </div>
                  <div className='flex flex-col w-fit gap-1'>
                    <Button size='icon' variant='outline'><Edit/></Button>
                    <Button size='icon' variant='destructive' onClick={()=>handleDelete(patroller.id as string)}><Trash/></Button>
                  </div>
                </li>
              ))
          }
         </ul>
      </DialogContent>
    </Dialog>
  )
}
