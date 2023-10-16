import {
  toast as reactToastify,
  ToastOptions as ReactToastifyOptions,
} from 'react-toastify'

import { ToastOptions } from './toast.types'

export function toast({ type, message, id, ...options }: ToastOptions) {
  const toastOptions: ReactToastifyOptions = {
    ...options,
    toastId: id || message,
  }

  if (type === 'success') {
    reactToastify.success(message, toastOptions)
  } else if (type === 'error') {
    reactToastify.error(message, toastOptions)
  } else if (type === 'warning') {
    reactToastify.warn(message, toastOptions)
  } else if (type === 'info') {
    reactToastify.info(message, toastOptions)
  }
}
