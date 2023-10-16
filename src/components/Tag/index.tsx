import * as S from './styles'
import { TagProps } from './types'

const Tag = ({ content, ...props }: TagProps) => {
  return (
    <S.Wrapper {...props}>
      <p>{content}</p>
    </S.Wrapper>
  )
}

export default Tag
