import HeaderOptions from "@/components/HeaderOptions"
import PatrollActions from "@/components/PatrollActions"
import { 
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow }
from "@/components/ui/table"
import { ArrowRight, Ellipsis, LoaderCircle, Plus, User, UserSearch } from "lucide-react"
import { format } from "date-fns"
import { useContext, useEffect, useState } from "react"
import JumperIconButton from "@/components/JumperIconButton"
import { Patrol } from "@/types/patroll"
import { SocketContext } from "@/hooks/useSocket"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function PatrollersPage() {
  const [datas, setDatas] = useState<Patrol[]>([])
  const [loading, setLoading] = useState(false)
  const {socket} = useContext(SocketContext)!
  const navigate = useNavigate()

  const getDatas = (date = new Date()) =>{
    if(socket){
      setLoading(true)
      socket.emit("filter-rondas-services", date);
      socket?.on("receive-all-rondas", (response:Patrol[])=>{
        setDatas(response)
        setLoading(false)
    })
  }}
  useEffect(() => {
    getDatas()
  }, [])

  const formattedDate = format(new Date(), "dd/MM/yyyy");

  if (loading) {
    return <section className="h-full w-full flex-1 flex items-center justify-center">
      <LoaderCircle className="h-20 w-20 text-blue-600 animate-spin"/>
    </section>
  }

  return (
    <section className="h-full w-full flex flex-1 flex-col items-center justify-start">
      <HeaderOptions>
        <JumperIconButton href="/auth/add-patrol">
          <Plus/>
        </JumperIconButton>
        <PatrollActions.Search setDatas={setDatas}/>
        <JumperIconButton href="/auth/add-patroller">
          <User/>
        </JumperIconButton>
        <JumperIconButton href="/auth/list-patroller">
          <UserSearch/>
        </JumperIconButton>
      </HeaderOptions>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Criação</TableHead>
            <TableHead>Condominio</TableHead>
            <TableHead>Ronda</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="flex items-center justify-end">
              <Ellipsis strokeWidth={1} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datas.length > 0 ? (
            datas.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.createdAt}</TableCell>
                <TableCell>{data.condominum}</TableCell>
                <TableCell>{data.ronda.name}</TableCell>
                <TableCell>{data.payed ? "Concluído" : "Pendente"}</TableCell>
                <TableCell>{data.finish ? "Completo" : "Incompleto"}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" onClick={()=>navigate(`/auth/Service-Patrol/${data.id}`)}>
                    <ArrowRight/>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>Nenhuma ronda encontrada neste dia.</TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Dia da pesquisa</TableCell>
            <TableCell className="text-right">{formattedDate}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </section>
  )
}
