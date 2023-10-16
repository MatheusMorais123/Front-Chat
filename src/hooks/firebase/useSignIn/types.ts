import { CreateUserDTO } from '../useCreateUser/types'

export type User = CreateUserDTO

export type SignInDTO = {
  email: string
  password: string
}
