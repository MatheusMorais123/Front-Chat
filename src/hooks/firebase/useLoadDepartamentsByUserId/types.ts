import { FirebaseDate } from '@/models/firebase/firebaseDate'

export type LoadDepartamentsByUserIdDTO = {
  userId: string
}

export type LoadDepartamentsByUserIdResponse = Departament[]

export type Departament = {
  id: string
  user_id: string
  name: string
  isActive: boolean
  createdAt: FirebaseDate
  updatedAt: FirebaseDate
}
