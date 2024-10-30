import { app } from '@/firebase';
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { FormEvent, useState } from 'react';
import { FirebaseError } from 'firebase/app';

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const auth = getAuth(app);

  const goToSignIn = () =>{
    navigate("/")
  }
  const login = async(event:FormEvent) =>{
    event.preventDefault()
    toast.success("teste")
    await createUserWithEmailAndPassword(auth, email, password).then(() => {
      toast.success("Conta criada com sucesso!")
      navigate("/")
    }).catch((error:FirebaseError) => {
        switch(error.code){
          case 'auth/wrong-password':
            toast.error("Senha inválida")
            break;
          case 'auth/user-not-found':
            toast.error("Usuário não encontrado")
            break;
            case 'auth/invalid-email':
              toast.error("Email inválido")
            break;
            case 'auth/invalid-password':
              toast.error("Password inválido")
            break;
            case 'auth/email-already-in-use':
              toast.error("Email já está em uso")
            break;
            case 'auth/too-many-requests':
              toast.error("Muitas tentativas de login. Tente novamente mais tarde")
            break;
            case 'auth/invalid-credential':
              toast.error("Credenciais inválidas")
            break;
          default:
            toast.error("Erro desconhecido")
            break;
        }
        return
    });
  }
  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Fazer seu registro</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='flex gap-1 flex-col' onSubmit={login} method='post'>
          <Input type='email' name='email' id='email' placeholder='email@email.com' onChange={(e)=>setEmail(e.target.value)}/>
          <Input type='password' name='password' id='password' placeholder='**********' className='my-1' onChange={(e)=>setPassword(e.target.value)}/>
          <div className='py-2 w-full'>
            <Button type='submit' className='w-full'>Entrar</Button>
          </div>
        </form>
        <CardFooter className='flex items-center justify-center h-14 py-0'>
          <div className=' flex items-center'>
            <small className='flex-1 h-full'>Já têm conta? <span className='text-blue-500 cursor-pointer hover:border-b border-blue-500' onClick={goToSignIn}>Faça login agora!</span></small>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
