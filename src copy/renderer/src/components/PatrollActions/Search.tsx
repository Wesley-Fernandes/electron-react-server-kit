
import { Button } from '../ui/button'
import { Search as SEARCH_SVG } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { Input } from '../ui/input'
import { FormEvent, useContext } from 'react'
import { SocketContext } from '@/hooks/useSocket'
import { Patrol } from '@/types/patroll'

interface Props{
  setDatas: (response:Patrol[]) => void
}
export function Search({setDatas}:Props) {

  const {socket} = useContext(SocketContext)!

  const getDatas = (date = new Date()) =>{
    if(socket){
  
      socket.emit("filter-rondas-services", date);
      socket?.on("receive-all-rondas", (response:Patrol[])=>{
        setDatas(response)
    })
  }}

  const search = (e:FormEvent) =>{
    e.preventDefault();
    const target = e.target as typeof e.target & {
      date: { value: string }
    };
  
    const dateValue = target.date.value;
  
    if (!dateValue) {
      alert("Por favor, insira uma data.");
      return;
    }
  
    // Converte a string para um objeto Date correto
    const date = new Date(dateValue + 'T00:00:00'); // Força o horário UTC 00:00:00 para evitar problemas de fuso
    getDatas(date)

  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <SEARCH_SVG />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle>Procurar por serviços de ronda</DialogTitle>
          <DialogDescription>
            Você pode procurar por serviços de rondas concluidos baseados em um dia especifico.
          </DialogDescription>
        </DialogHeader>
          <form className='flex flex-col gap-2' onSubmit={search}>
            <label htmlFor="date" className='flex items-center justify-between gap-2'>
              <span>Data para pesquisar</span>
              <Input type='date' id='date' placeholder='Nome do ronda...' name='date' className='justify-center w-fit '/>
            </label>
            <Button type='submit'>Iniciar pesquisa</Button>
          </form>
      </DialogContent>
    </Dialog>
  )
}
