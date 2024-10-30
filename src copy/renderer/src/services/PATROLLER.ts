import { db } from '@/firebase'
import type { Patroller } from '@/types/patroll'
import { collection, doc, addDoc, getDocs, deleteDoc, getDoc, updateDoc } from 'firebase/firestore'

interface addNewPatrollersProps {
  data: Patroller
}

const addNewPatroller = async ({ data }: addNewPatrollersProps) => {
  return await addDoc(collection(db, 'patrollers'), data)
}

const deletePatroller = async (id: string) => {
  const docRef = doc(db, 'patrollers', id)
  return deleteDoc(docRef)
    .then(() => {
      return { message: 'Sucesso ao deletar ronda.', sucess: true }
    })
    .catch((error) => {
      return { message: error.message, sucess: false }
    })
}

const getPatroller = async (id: string) => {
  try {
    const docRef = doc(db, 'patrollers', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return { message: docSnap.data(), sucess: true }
    } else {
      return { message: 'Documento não existe.', sucess: true }
    }
  } catch (error: any) {
    console.log(error)
    return { message: 'Houve um erro. Tente novamente.', sucess: false }
  }
}

const updatePatroller = async (id: string, data: Partial<Patroller>) => {
  const docRef = doc(db, 'patrollers', id)
  updateDoc(docRef, data)
    .then(() => {
      return { message: 'Documento atualizado com sucesso!', sucess: true }
    })
    .catch((error) => {
      console.log(error)
      return { message: 'Houve um erro ao tentar atualizar o documento.', sucess: true }
    })
}

const listPatrollers = async () => {
  const colRef = collection(db, 'patrollers')
  const docsSnap = await getDocs(colRef)
  let datas: Patroller[] = []
  docsSnap.forEach((doc) => {
    datas.push({ id: doc.id, ...(doc.data() as Patroller) })
  })
  return datas
}

/**
 * Funções relacionadas ao RONDA
 *
 */
const PATROLLER = {
  add: addNewPatroller,
  update: updatePatroller,
  get: getPatroller,
  erase: deletePatroller,
  list: listPatrollers
}

export default PATROLLER
