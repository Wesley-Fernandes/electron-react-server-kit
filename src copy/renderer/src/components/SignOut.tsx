import { signOut } from 'firebase/auth';
import { Button } from './ui/button'
import {auth} from "@/firebase"
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
export default function SignOut() {
  const navigate = useNavigate();
  const logout = async () =>{
    signOut(auth).then(() => {
      navigate("/");
      toast.success("Usuario deslogado.")
    }).catch((error) => {
      toast.error("Erro ao desconectar-se.")
      console.log(error)
    });
  }
  return (
    <Button className='w-full' variant="destructive" onClick={logout}>Desconectar-se</Button>
  )
}
