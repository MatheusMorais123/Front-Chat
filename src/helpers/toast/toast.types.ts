import { ToastOptions as ReactToastifyOptions } from 'react-toastify'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastId =
  | 'signin-success'
  | 'signin-error'
  | 'signup-success'
  | 'signup-error'

export type ToastOptions = {
  type: ToastType
  message: string
  id?: ToastId
} & Omit<ReactToastifyOptions, 'toastId'>
