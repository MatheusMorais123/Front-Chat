import { ComponentProps, ReactNode } from 'react'

type InputTypes = ComponentProps<'input'>

export type InputProps = {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  label?: string
  labelColor?: string
  labelSize?: string
  borderRadius?: string
  borderSize?: string
  borderColor?: string
} & InputTypes
