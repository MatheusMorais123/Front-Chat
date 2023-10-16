import { collection, doc, setDoc } from 'firebase/firestore'
import { CreateDepartamentDTO } from './types'
import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'

async function request(dto: CreateDepartamentDTO) {
  try {
    const newDepartamentDoc = doc(collection(_firestore, 'departaments'))

    dto.id = newDepartamentDoc.id

    await setDoc(newDepartamentDoc, dto)

    return dto
  } catch (error) {
    throw new Error(error)
  }
}

export function useCreateDepartament(
  params?: UseMutationOptions<any, unknown, CreateDepartamentDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
