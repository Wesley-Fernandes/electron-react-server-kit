import JumperBackButton from "@/components/JumperBackButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SocketContext } from "@/hooks/useSocket"
import { FormEvent, useContext, useRef, useState } from "react"
import { toast } from "sonner"

export default function AddPatrollerPage() {
  const rstButton = useRef<HTMLButtonElement|null>(null)
  const [name, setName] = useState("")
  const [cellphone, setCellphone] = useState("")
  const [pix, setPix] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const context = useContext(SocketContext)
  
  if(!context){
    return null;
  }

  const {socket} = context

  if(!socket){
    console.log("Não existe context")
    return null;
  }

  const handleCreate = async(e:FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if(name && address && pix && cellphone){
      socket.emit('create-ronda', {name, cellphone, pix, address})
      setTimeout(()=>{
        eraseInputs()
        rstButton.current?.click()
        setLoading(false)
      }, 1000)
    }else{
      toast.error('Todos os campos são obrigatórios!')
      setLoading(false)
    }
  }

  const eraseInputs = () => {
    setName("")
    setCellphone("")
    setPix("")
    setAddress("")
  }
  return (
    <section className="h-full w-full flex flex-1 flex-col items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <JumperBackButton/>
          <CardTitle>Adicionar novo ronda</CardTitle>
        </CardHeader>
        <CardContent>
        <form className='flex flex-col gap-2 ' onSubmit={handleCreate}>
            <Input placeholder='Nome do ronda...' name='name' onChange={(e)=>setName(e.target.value)} disabled={loading}/>
            <Input type='tel' placeholder='Número de celular...' name='cellphone'  onChange={(e)=>setCellphone(e.target.value)} disabled={loading}/>
            <Input placeholder='Chave pix...' name='pix'  onChange={(e)=>setPix(e.target.value)} disabled={loading}/>
            <Input type='text' placeholder='Endereço...' name='address'  onChange={(e)=>setAddress(e.target.value)} disabled={loading}/>
            <button type='reset' ref={rstButton} className='hidden'>resetar</button>
            <Button type='submit' className='mt-2 -mb-2' disabled={loading}>Continuar</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
