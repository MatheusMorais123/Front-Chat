import SearchIcon from '@/assets/images/search.svg'
import Input from '@/components/Input/Input'
import { useState } from 'react'
import * as S from './styles'

const FilterDropDown = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false)

  return (
    <S.Filter>
      <form>
        <Input
          placeholder="Filtre por operador"
          leftIcon={<SearchIcon color="#262931" />}
        />
      </form>

      <button
        onClick={() => {
          setShowFilters(!showFilters)
        }}
      >
        Mais Filtros
      </button>

      {showFilters && (
        <div>
          <label>Dia</label>

          <input type="date" placeholder="Dia" />

          <label>Mês</label>

          <input type="date" placeholder="Mês" />

          <label>Mês Passado</label>

          <input type="date" placeholder="Mês passado" />

          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              setShowPeriodDropdown(!showPeriodDropdown)
            }}
          >
            Período
          </a>

          {showPeriodDropdown && (
            <div className="show">
              <label>Início</label>

              <input type="date" />

              <label>Fim</label>

              <input type="date" />
            </div>
          )}

          <input type="text" placeholder="Setores" />
        </div>
      )}
    </S.Filter>
  )
}

export default FilterDropDown
