import {
  CollectionReference,
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { CreateOperatorDTO } from './types'
import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'

async function request(dto: CreateOperatorDTO) {
  try {
    const operatorsCollection = collection(_firestore, 'operators')

    if (await userExists(dto.email, operatorsCollection)) {
      throw new Error('Já existe um usuário com o mesmo e-mail')
    }

    const operatorDoc = doc(operatorsCollection, dto.id)
    await setDoc(operatorDoc, dto)

    return dto
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

// TODO: move this to a helper
async function userExists(
  email: string,
  collection: CollectionReference<DocumentData>,
) {
  const usersSnapshot = await getDocs(
    query(collection, where('email', '==', email.toLowerCase())),
  )

  return !usersSnapshot.empty
}

export function useCreateOperator(
  params?: UseMutationOptions<any, unknown, CreateOperatorDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
