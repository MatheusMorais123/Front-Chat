import { _firestore } from '@/helpers/firebase'
import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { collection, getDocs, query, where } from 'firebase/firestore'
import {
  Departament,
  LoadDepartamentsByUserIdDTO,
  LoadDepartamentsByUserIdResponse,
} from './types'

async function request(dto: LoadDepartamentsByUserIdDTO) {
  try {
    const departamentsCollection = collection(_firestore, 'departaments')
    const _query = query(
      departamentsCollection,
      where('user_id', '==', dto.userId),
    )

    const departamentsSnapshot = await getDocs(_query)
    const departaments: LoadDepartamentsByUserIdResponse =
      departamentsSnapshot.docs.map(doc => doc.data() as Departament)

    return departaments
  } catch (error) {
    throw new Error(error)
  }
}

export function useLoadDepartamentsByUserId(
  params?: UseMutationOptions<
    any,
    unknown,
    LoadDepartamentsByUserIdDTO,
    unknown
  >,
) {
  return useMutation({
    mutationFn: request,
    ...params,
  })
}
