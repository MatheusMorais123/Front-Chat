import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore'
import { InactivateOperatorDTO } from './types'

async function request(dto: InactivateOperatorDTO) {
  try {
    const operatorRef = doc(_firestore, 'operators', dto.operatorId)
    await updateDoc(operatorRef, { isActive: false })
  } catch (error) {
    throw new Error(error)
  }
}

export function useInactivateOperator(
  params?: UseMutationOptions<any, unknown, InactivateOperatorDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
