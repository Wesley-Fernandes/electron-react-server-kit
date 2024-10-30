import { FormEvent, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PATROLLER from '@/services/PATROLLER';
import useAuth from '@/hooks/useAuth';
import { Patroller } from '@/types/patroll';
import { Timestamp } from 'firebase/firestore';
import { SocketContext } from '@/hooks/useSocket';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormData {
  condominum: string;
  rondaId: string;
}

export default function AddPatroller() {
  const [patrollers, setPatrollers] = useState<Patroller[]>([]);
  const creator = useAuth();
  const [loading, setLoading] = useState(false);
  const context = useContext(SocketContext);

  if(!context) return;
  const { socket } = context;
  if(!socket) return;

  const [formData, setFormData] = useState<FormData>({
    condominum: '',
    rondaId: '',
  });

  useEffect(() => {
    const getPatrollers = async () =>{
      socket.emit("get-all-rondas");
      socket.on("receive-all-rondas", (response:Patroller[])=>{
        setPatrollers(response)
      });
    }
    getPatrollers();
  }, []);

  if (!creator) {
    return (
      <div>
        <p>Você precisa estar logado para adicionar uma nova ronda.</p>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'coming' || name === 'going' ? Number(value) : value,
    }));
  };

  const handlePatrollerSelect = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      rondaId: String(patrollers.find((p) => p.id === value)?.id)|| '',
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    socket.emit("create-ronda-service",{
        ...formData,
        creator: {
          id: creator.uid,
          picture: creator.photoURL || "Sem foto",
          username: creator.displayName || "Nome não definido",
        },
        updater:{
          id: creator.uid,
          picture: creator.photoURL || "Sem foto",
          username: creator.displayName || "Nome não definido",
        }
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  };

  return (
    <section className="h-full w-full flex flex-1 flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar novo serviço de ronda</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="condominum">Condomínio</label>
              <Input
                id="condominum"
                placeholder="Condomínio..."
                name="condominum"
                required
                value={formData.condominum}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="patroller">Ronda</label>
              <Select onValueChange={handlePatrollerSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ronda" />
                </SelectTrigger>
                <SelectContent>
                  {patrollers.map((patroller) => (
                    <SelectItem key={patroller.id} value={patroller.id as string}>
                      {patroller.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="mt-2" disabled={loading}>
              {loading ? 'Carregando...' : 'Continuar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
