import { _firestore, auth } from '@/helpers/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import router from 'next/router'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { SignInDTO, User } from './types'

async function request(dto: SignInDTO) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      dto.email,
      dto.password,
    )

    const { email } = userCredential.user

    const usersCollection = collection(_firestore, 'users')

    const user = await findUserByEmail(email, usersCollection)

    if (user) {
      if (!user.isActive) {
        throw new Error('Usuário inativo. Acesso não permitido.')
      }

      // TODO: improve this
      delete user.created_at
      localStorage.setItem('authUser', JSON.stringify(user))
      router.push('/dashboard')
      return
    }

    const operatorsCollection = collection(_firestore, 'operators')
    const operator = await findUserByEmail(email, operatorsCollection)

    if (operator) {
      if (!operator.isActive) {
        throw new Error('Usuário inativo. Acesso não permitido.')
      }

      // TODO: improve this
      delete operator.created_at
      localStorage.setItem('authUser', JSON.stringify(operator))
      window.open('http://localhost:3002', '_blank')
    }
  } catch (error) {
    if (error.code) throw new Error(error.code)
    throw new Error(error)
  }
}

// TODO: move to helpers file
async function findUserByEmail(
  email: string,
  collection: CollectionReference<DocumentData>,
) {
  const usersSnapshot = await getDocs(
    query(collection, where('email', '==', email.toLowerCase())),
  )

  if (usersSnapshot.empty) return null

  const user = usersSnapshot.docs[0].data() as User

  return user
}

export function useSignIn(
  params?: UseMutationOptions<any, unknown, SignInDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
