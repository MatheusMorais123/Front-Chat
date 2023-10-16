import { FirebaseDate } from '@/models/firebase/firebaseDate'

export type CreateUserDTO = {
  id: string
  name: string
  email: string
  emailIsVerified: boolean
  isActive: boolean
  isAdmin: boolean
  created_at: FirebaseDate
}
