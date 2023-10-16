import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
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
import { CreateUserDTO } from './types'
import { api } from '@/services/api'

async function request(dto: CreateUserDTO) {
  try {
    const usersCollection = collection(_firestore, 'users')

    if (await userExists(dto.email, usersCollection)) {
      throw new Error('Já existe um usuário com o mesmo e-mail')
    }

    const userDoc = doc(usersCollection, dto.id)
    await setDoc(userDoc, dto)

    await api.post('/create-new-user-resource', { userId: dto.id })

    return dto
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

async function userExists(
  email: string,
  collection: CollectionReference<DocumentData>,
) {
  const usersSnapshot = await getDocs(
    query(collection, where('email', '==', email.toLowerCase())),
  )

  return !usersSnapshot.empty
}

export function useCreateUser(
  params?: UseMutationOptions<any, unknown, CreateUserDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
