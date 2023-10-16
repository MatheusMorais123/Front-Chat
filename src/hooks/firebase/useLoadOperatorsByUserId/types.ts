import { FirebaseDate } from '@/models/firebase/firebaseDate'

export type LoadOperatorsByUserIdDTO = {
  userId: string
}

export type LoadNumbersByUserIdResponse = Operator[]

export type Operator = {
  id: string
  // TODO: change this to userId
  user_id: string
  name: string
  email: string
  emailIsVerified: boolean
  isActive: boolean
  isAdmin: boolean
  created_at: FirebaseDate
  updated_at: FirebaseDate
}
