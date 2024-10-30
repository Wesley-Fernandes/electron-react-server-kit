import JumperBackButton from "@/components/JumperBackButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SocketContext } from "@/hooks/useSocket"
import PATROLLER from "@/services/PATROLLER"
import { Patroller } from "@/types/patroll"
import { Edit, Headset, MapPin, Trash, WalletMinimal } from "lucide-react"
import { useContext, useEffect, useState } from "react"

export default function ListPatrollerPage() {
  const [patrollers, setPatrollers] = useState<Patroller[]>([])

  const context = useContext(SocketContext)
  
  if(!context){
    return null;
  }

  const {socket} = context

  if(!socket){
    console.log("Não existe context")
    return null;
  }

  useEffect(()=>{
    const handlePatrollers = async () =>{
      socket.emit("get-all-rondas");
      socket.on("receive-all-rondas", (response:Patroller[])=>{
        setPatrollers(response)
      });
    }
    handlePatrollers();
  }, [])

  const handleDelete = async(id: string) =>{
    socket.emit("delete-ronda", id);
    setPatrollers(patrollers.filter(p => p.id!== id));
  }
  return (
    <section className="h-full w-full flex flex-1 flex-col items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <JumperBackButton/>
          <CardTitle>Listas dos rondas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
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
        </CardContent>
      </Card>
    </section>
  )
}
