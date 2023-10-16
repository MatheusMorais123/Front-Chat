import { FirebaseDate } from '@/models/firebase/firebaseDate'

export type UserNumber = {
  id: string
  userId: string
  name: string
  phone: string
  isActive: boolean
  createdAt: FirebaseDate
  updatedAt: FirebaseDate
}

export type UserDepartament = {
  id: string
  user_id: string
  name: string
  isActive: boolean
  createdAt: FirebaseDate
  updatedAt: FirebaseDate
}

export type UserOperator = {
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
