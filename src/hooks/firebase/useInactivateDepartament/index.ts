import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { InactivateDepartamentDTO } from './types'

async function request(dto: InactivateDepartamentDTO) {
  try {
    const departamentRef = doc(_firestore, 'departaments', dto.departamentId)

    await updateDoc(departamentRef, { isActive: false })

    const _doc = await getDoc(departamentRef)

    return _doc
  } catch (error) {
    throw new Error(error)
  }
}

export function useInactivateDepartament(
  params?: UseMutationOptions<any, unknown, InactivateDepartamentDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
