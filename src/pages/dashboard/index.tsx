import Cards from '@/components/Cards'
import FilterDropDown from '@/components/FilterDropDown'
import Header from '@/components/Header'
import PrivateRoute from '../../helpers/PrivateRoute'
import * as S from './styles'

export default function Dashboards() {
  return (
    <S.Wrapper>
      <PrivateRoute>
        <S.ContainerFluid>
          <Header title="Dashboard" />
        </S.ContainerFluid>

        <S.Container>
          <FilterDropDown />

          <Cards />

          <S.Row>
            <S.Left>
              <p>Atendimentos</p>
            </S.Left>

            <S.Right>
              <p>Top 10 mais atendidos</p>
            </S.Right>
          </S.Row>
        </S.Container>
      </PrivateRoute>
    </S.Wrapper>
  )
}
