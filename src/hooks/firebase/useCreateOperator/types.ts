import { FirebaseDate } from '@/models/firebase/firebaseDate'

export type CreateOperatorDTO = {
  id: string
  name: string
  email: string
  emailVerified: boolean
  numbers: any[]
  password: string
  isActive: boolean
  isAdmin: boolean
  userId: string
  createdAt: FirebaseDate
  updatedAt?: FirebaseDate
}
