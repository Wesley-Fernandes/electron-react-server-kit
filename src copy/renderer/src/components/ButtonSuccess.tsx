
import { useContext } from 'react'
import { Button } from './ui/button'
import { SocketContext } from '@/hooks/useSocket'

export default function ButtonSuccess() {
    const ctx = useContext(SocketContext)

    const handleClick = () => {
        console.log("Trying success")
        ctx?.socket?.emit('try-success')
    }
  return (
    <Button onClick={handleClick}>Sucesso</Button>
  )
}
