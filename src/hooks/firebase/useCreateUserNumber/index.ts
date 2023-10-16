import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore'
import { CreateUserNumberDTO } from './types'
import { UserNumber } from '@/recoil/atoms/user/types'

function buildUserNumber(number: Partial<UserNumber>) {
  return {
    ...number,
    id: '',
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  }
}

async function request(dto: CreateUserNumberDTO) {
  try {
    const number = buildUserNumber(dto.number)
    const newNumberDoc = doc(collection(_firestore, 'userNumbers'))

    number.id = newNumberDoc.id

    await setDoc(newNumberDoc, number)

    return number
  } catch (error) {
    throw new Error(error)
  }
}

export function useCreateUserNumber(
  params?: UseMutationOptions<any, unknown, CreateUserNumberDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
