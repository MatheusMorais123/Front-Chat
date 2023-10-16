import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import {
  LoadNumbersByUserIdResponse,
  LoadOperatorsByUserIdDTO,
  Operator,
} from './types'

async function request(dto: LoadOperatorsByUserIdDTO) {
  try {
    const operatorsCollection = collection(_firestore, 'operators')

    const _query = query(operatorsCollection, where('userId', '==', dto.userId))

    const operatorsSnapshot = await getDocs(_query)
    const operators: LoadNumbersByUserIdResponse = operatorsSnapshot.docs.map(
      doc => doc.data() as Operator,
    )

    return operators
  } catch (error) {
    throw new Error(error)
  }
}

export function useLoadOperatorsByUserId(
  params?: UseMutationOptions<any, unknown, LoadOperatorsByUserIdDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
