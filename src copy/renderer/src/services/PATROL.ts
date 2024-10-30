import { db } from '@/firebase'
import type { Patrol } from '@/types/patroll'
import { startOfDay, endOfDay } from 'date-fns'
import {
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  where
} from 'firebase/firestore'

const addPatrol = async (data: Partial<Patrol>) => {
  return await addDoc(collection(db, 'patrols'), data)
    .then(() => {
      return { message: 'Sucesso ao criar ronda.', sucess: false }
    })
    .catch((err) => {
      console.log(err)
      return { message: 'Erro ao tentar criar ronda.', sucess: false }
    })
}

const deletePatrol = async (id: string) => {
  const docRef = doc(db, 'patrols', id)
  return deleteDoc(docRef)
    .then(() => {
      return { message: 'Sucesso ao deletar serviço de ronda.', sucess: true }
    })
    .catch((error) => {
      return { message: error.message, sucess: false }
    })
}

const getPatrol = async (id: string) => {
  try {
    const docRef = doc(db, 'patrols', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { message: docSnap.data() as Patrol, sucess: true }
    } else {
      return { message: 'Documento não existe.', sucess: true }
    }
  } catch (error: any) {
    console.log(error)
    return { message: 'Houve um erro. Tente novamente.', sucess: false }
  }
}

const updatePatrol = async (id: string, data: Partial<Patrol>) => {
  const docRef = doc(db, 'patrols', id)
  return updateDoc(docRef, data)
    .then(() => {
      return { message: 'Documento atualizado com sucesso!', sucess: true }
    })
    .catch((error) => {
      console.log(error)
      return { message: 'Houve um erro ao tentar atualizar o documento.', sucess: false } // Corrigido o valor de 'sucess' para false
    })
}

/**
 * Listar todos os serviços de patrulha a partir de um timestamp.
 * Obtém todas as patrulhas do dia do timestamp fornecido.
 *
 * @param {number} timestamp - O timestamp Unix (em segundos) usado para calcular o dia.
 * @returns {Promise<Patrol[]>} - Retorna uma lista de patrulhas dentro do intervalo desse dia.
 */
const listPatrols = async (timestamp: number): Promise<Patrol[]> => {
  const collectionRef = collection(db, 'patrols')

  // Converte o timestamp de segundos para milissegundos
  const date = new Date(timestamp * 1000)

  // Calcula o início e o fim do dia
  const startOfDayDate = startOfDay(date).getTime() / 1000 // Convertendo para segundos
  const endOfDayDate = Math.floor(endOfDay(date).getTime() / 1000) // Convertendo para segundos

  console.log({ startOfDayDate, endOfDayDate })

  // Realiza a consulta para pegar todas as patrulhas dentro do intervalo do dia
  const q = query(
    collectionRef,
    where('createdAt', '>=', startOfDayDate), // Início do dia
    where('createdAt', '<=', endOfDayDate) // Fim do dia
  )

  // Obtém os documentos que correspondem à consulta
  const docsSnap = await getDocs(q)

  // Mapeia os documentos para o formato correto de Patrol
  let datas: Patrol[] = []
  docsSnap.forEach((doc) => {
    const { id, ...archive_rest } = doc.data() as Patrol
    const archive = { id: doc.id, ...archive_rest }
    datas.push(archive)
  })

  return datas
}

/**
 * Funções relacionadas ao serviço de patrulha
 *
 */
const PATROL = {
  add: addPatrol,
  delete: deletePatrol,
  get: getPatrol,
  update: updatePatrol,
  list: listPatrols
}

export default PATROL
