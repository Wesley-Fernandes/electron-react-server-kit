import { FormEvent, useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import PATROLLER from '@/services/PATROLLER';
import PATROL from '@/services/PATROL';
import useAuth from '@/hooks/useAuth';
import { Patroller } from '@/types/patroll';
import { Timestamp } from 'firebase/firestore';
import { SocketContext } from '@/hooks/useSocket';

interface FormData {
  condominum: string;
  patroller: any;
  createdAt: number;
  start: string;
  end: string;
  total: number;
  going: number;
  coming: number;
  finish: boolean;
  payed: boolean;
}
export function NewPatroller() {
  const [patrollers, setPatrollers] = useState<Patroller[]>([]);
  const creator = useAuth();
  const [loading, setLoading] = useState(false);

  const context = useContext(SocketContext)

  if(!context){
    return null;
  }

  const [formData, setFormData] = useState<FormData>({
    condominum: '',
    patroller: null,
    createdAt: Timestamp.now().seconds,
    start: '',
    end: '',
    total: 0,
    going: 0,
    coming: 0,
    finish: false,
    payed: false,
  });

  useEffect(() => {
    const fetchPatrollers = async () => {
      try {
        const response = await PATROLLER.list();
        setPatrollers(response);
      } catch (error) {
        toast.error('Erro ao carregar os rondas.');
      }
    };

    fetchPatrollers();
  }, []);

  if (!creator) {
    return (
      <div>
        <p>Você precisa estar logado para adicionar uma nova ronda.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'coming' || name === 'going' ? Number(value) : value,
    }));
  };

  const handlePatrollerSelect = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      patroller: patrollers.filter((p) => p.id === value)[0] || null,
    }));
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await PATROL.add({...formData, creator:{
        id: creator.uid,
        picture: creator.photoURL || "Sem foto",
        username: creator.displayName || "Nome não definido",
      }});
      if (response.sucess) {
        toast.success('Ronda adicionada com sucesso!');
      } else {
        toast.error(response.message || 'Erro ao adicionar a ronda.');
      }
    } catch (error) {
      toast.error('Erro ao tentar adicionar a ronda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-96'>
        <DialogHeader>
          <DialogTitle>Adicionar novo serviço de ronda</DialogTitle>
          <DialogDescription>
            Adicione um novo ronda para poder selecioná-lo a uma patrulha.
          </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <Input
            placeholder='Condomínio...'
            name='condominum'
            value={formData.condominum}
            onChange={handleInputChange}
          />
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

          <Input
            placeholder='Hora de início...'
            name='start'
            type='datetime-local'
            value={formData.start}
            onChange={handleInputChange}
          />

          <Input
            placeholder='Hora de término...'
            name='end'
            type='datetime-local'
            value={formData.end}
            onChange={handleInputChange}
          />

          <Input
            placeholder='Valor de ida...'
            name='going'
            type='number'
            value={formData.going}
            onChange={handleInputChange}
          />

          <Input
            placeholder='Valor de volta...'
            name='coming'
            type='number'
            value={formData.coming}
            onChange={handleInputChange}
          />

          <Button type='submit' className='mt-2 -mb-2' disabled={loading}>
            {loading ? 'Carregando...' : 'Continuar'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
