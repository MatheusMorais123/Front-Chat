import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { LoadNumbersByUserIdDTO } from './types'

async function request({ userId }: LoadNumbersByUserIdDTO) {
  try {
    const numbersCollection = collection(_firestore, 'userNumbers')
    const numbersQuery = query(
      numbersCollection,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc'),
    )

    const numbersQuerySnapShot = await getDocs(numbersQuery)
    const numbersData = numbersQuerySnapShot.docs.map(doc => doc.data())

    return numbersData
  } catch (error) {
    throw new Error(error)
  }
}

export function useLoadNumbersByUserId(
  params?: UseMutationOptions<any, unknown, LoadNumbersByUserIdDTO, unknown>,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
