import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { EditDepartamentDTO } from './types'

async function request(dto: EditDepartamentDTO) {
  try {
    const departamentRef = doc(_firestore, 'departaments', dto.id)

    await updateDoc(departamentRef, dto)

    const _doc = await getDoc(departamentRef)

    return _doc
  } catch (error) {
    throw new Error(error)
  }
}

export function useEditDepartament(
  params?: UseMutationOptions<any, unknown, EditDepartamentDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
