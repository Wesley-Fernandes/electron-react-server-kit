import { Button } from '@/components/ui/button'
import { FileSliders, Send } from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar"
import { Patrol } from '@/types/patroll'
import { useContext, useEffect, useState } from 'react'
import { erase_ronda, update_ronda_service } from '@/utils/SOCKET'
import { SocketContext } from '@/hooks/useSocket'
import { Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card"
import { useParams } from 'react-router-dom'
import JumperBackButton from '@/components/JumperBackButton'
import { UpdateStart } from '@/components/PatrollActions/UpdateStart'

export function UpdateService() {
  const [data, setData] = useState<Patrol|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { socket } = useContext(SocketContext)!
  const { id } = useParams();


  const handleDelete = async () => {
    erase_ronda(socket, id!)
  }

  const handleComplete = async () => {
    if(!loading){
      setLoading(true)
    }
    update_ronda_service(socket, id!, { finish: true })
    const updatedData = {...data!, finished: true}
    setData(updatedData)
    setLoading(false)
  }

  const handlePayment = async () => {
    if(!loading){
      setLoading(true)
    }
    update_ronda_service(socket, id!, { payed: true })
    const updatedData = {...data!, payed: true}
    setData(updatedData)
    setLoading(false)
  }
  
  const getDatas = () =>{
    if(socket){
      setLoading(true)
      socket.emit("get-ronda-service", {id});
      socket?.on("send-ronda-service-response", (response:Patrol)=>{
        console.log({response})
        setData(response)
        setLoading(false)
    })
  }}

  useEffect(() => {
    getDatas()
  }, [])


  if(loading){
    return null
  }

  if(!data){
    return <h1>Sem dados para {id}</h1>
  }


  return (
    <div className="flex justify-center mt-4">
      <Card className="w-96">
        <CardHeader>
          <JumperBackButton/>
          <CardTitle>{data.id}</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col hover:bg-primary-foreground gap-2 border p-2 rounded">
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Data de criação:</span>
                <span className="text-sm">{String(data.createdAt)}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Criado por:</span>
                <span className="text-sm">{"Not name"}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Nome do ronda:</span>
                <span className="text-sm">{data.ronda.name||"Not name"}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Nome do condomínio:</span>
                <span className="text-sm">{data.condominum}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Valor transporte ida:</span>
                <span className="text-sm">{data.going}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Valor transporte volta:</span>
                <span className="text-sm">{data.coming}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Horário de início:</span>
                <span className="text-sm">{data.start||"Ainda não chegou..."}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Horário de fim:</span>
                <span className="text-sm">{data.end||"Ainda não acabou a ronda..."}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Total de horas:</span>
                <span className="text-sm">1 hora</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Valor total:</span>
                <span className="text-sm">{data.total}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Status do pagamento:</span>
                <span className="text-sm">{data.payed ? "Pagamento efetuado" : "Pagamento pendente"}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Status do serviço:</span>
                <span className="text-sm">{data.finish ? "Serviço finalizado" : "Serviço em andamento"}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-semibold">Última atualização:</span>
                <span className="text-sm">{data.updater.username || ""}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="w-full pt-2">
          <div className="flex w-full justify-between items-center">
            <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
            <div className='flex items-center gap-1'>
              <Button size="icon" disabled={data.payed || data.finish} variant="outline"><Send/></Button>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer p-1 py-1 border-none outline-none">
                  <FileSliders strokeWidth={1.5} />
                </MenubarTrigger>
                <MenubarContent className='flex flex-col'>
                  <Button variant="ghost" disabled={data.start===""} className="w-48 cursor-pointer hover:bg-green-500 hover:text-white" onClick={handlePayment}>Ronda chegou</Button>
                  <Button variant="ghost" disabled={data.start!=""} className="w-48 cursor-pointer hover:bg-green-500 hover:text-white" onClick={handlePayment}>Ronda saiu</Button>
                  <MenubarSeparator />
                  <UpdateStart id={id!}/>
                  <Button variant="ghost" className="w-48 cursor-pointer hover:bg-blue-500 hover:text-white">Atualizar valor chegada</Button>
                  <MenubarSeparator />
                  <Button variant="ghost" disabled={data.payed||data.start!=""||data.end!=""} className="w-48 cursor-pointer hover:bg-red-500 hover:text-white" onClick={handlePayment}>Concluir pagamento</Button>
                  <Button variant="ghost" disabled={data.finish||data.start!=""||data.end!=""} className="w-48 cursor-pointer hover:bg-red-500 hover:text-white" onClick={handleComplete}>Concluir serviço</Button>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
