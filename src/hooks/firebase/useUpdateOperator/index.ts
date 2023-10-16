import { _firestore } from '@/helpers/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { UpdateOperatorDTO } from './types'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'

async function request(dto: UpdateOperatorDTO) {
  try {
    const operatorDoc = doc(_firestore, 'operators', dto.id)

    await updateDoc(operatorDoc, dto)

    const _doc = await getDoc(operatorDoc)

    return _doc
  } catch (error) {
    throw new Error(error)
  }
}

export function useUpdateOperator(
  params?: UseMutationOptions<any, unknown, UpdateOperatorDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
