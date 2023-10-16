import * as S from './styles'
import { InputProps } from './types'

const Input = ({
  leftIcon,
  rightIcon,
  label,
  labelColor,
  labelSize,
  borderColor,
  borderRadius,
  borderSize,
  ...props
}: InputProps) => {
  return (
    <S.Wrapper labelColor={labelColor} labelSize={labelSize}>
      {label && <label htmlFor="main-input">{label}</label>}

      <S.InputContainer
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderSize={borderSize}
      >
        {leftIcon && <S.LeftIcon>{leftIcon}</S.LeftIcon>}

        <input id="main-input" {...props} />

        {rightIcon && <S.RightIcon>{rightIcon}</S.RightIcon>}
      </S.InputContainer>
    </S.Wrapper>
  )
}

export default Input
