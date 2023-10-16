import { atom } from 'recoil'
import { UserDepartament, UserNumber, UserOperator } from './types'

export const userNumbersState = atom<UserNumber[]>({
  key: 'userNumbersState',
  default: [],
})

export const userDepartamentsState = atom<UserDepartament[]>({
  key: 'userDepartamentsState',
  default: [],
})

export const userOperatorsState = atom<UserOperator[]>({
  key: 'userOperatorsState',
  default: [],
})
