import { FirebaseDate } from '@/models/firebase/firebaseDate'
import { UserDepartament } from '@/recoil/atoms/user/types'

export type EditDepartamentDTO = {
  updatedAt: FirebaseDate
} & Partial<UserDepartament>
