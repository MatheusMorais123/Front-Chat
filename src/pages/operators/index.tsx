'use-client'
import SearchIcon from '@/assets/images/search.svg'
import Header from '@/components/Header'
import Input from '@/components/Input/Input'
import NewOperator from '@/components/NewOperator'
import { useInactivateOperator } from '@/hooks/firebase/useInactivateOperator'
import { useLoadOperatorsByUserId } from '@/hooks/firebase/useLoadOperatorsByUserId'
import { useEffect, useState } from 'react'
import * as S from './styles'
import { useRecoilState } from 'recoil'
import { userOperatorsState } from '@/recoil/atoms/user'
import { toast } from '@/helpers/toast/toast.helper'
export default function Departament() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedOperatorId, setSelectedOperatorId] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [, setUpdateOperator] = useState(false)
  const [, setUserId] = useState()
  const [operators, setOperators] = useRecoilState(userOperatorsState)

  const { mutate: loadOperatorsByUserId } = useLoadOperatorsByUserId({
    onSuccess(data) {
      setOperators(data)
    },
    onError(error) {
      alert(error)
    },
  })

  const { mutate: inactivateOperator } = useInactivateOperator({
    onSuccess() {
      toast({ type: 'success', message: 'Operador atualizado com successo.' })
      setUpdateOperator(true)
    },
    onError(error) {
      console.error('Error when inactivate operator:', error)
      toast({
        type: 'error',
        message: 'Erro ao atualizar operador, tente novamente.',
      })
    },
  })

  // TODO: imporove modals
  const openEditModal = operatorId => {
    setSelectedOperatorId(operatorId)
    setIsModalVisible(true)
  }

  const filterOperators = () => {
    const filtered = operators.filter(op =>
      op.email.toLowerCase().includes(searchValue.toLowerCase()),
    )
    return filtered
  }

  useEffect(() => {
    // TODO: improve this
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    const userId = authUser ? authUser.id : null

    setUserId(userId)

    if (userId) {
      console.log({ userId })
      loadOperatorsByUserId({ userId })
    }
  }, [loadOperatorsByUserId])

  return (
    <S.Wrapper>
      <S.ContainerFluid>
        <Header title="Operadores" />
        <S.Container>
          <S.Actions>
            <form>
              <Input
                placeholder="Filtre por operador"
                leftIcon={<SearchIcon color="#262931" />}
                onChange={(e: any) => {
                  setSearchValue(e.target.value)
                }}
              />
            </form>
            <S.NewDepartament>
              <button
                onClick={() => {
                  setIsModalVisible(true)
                }}
              >
                + Novo operador
              </button>
            </S.NewDepartament>
          </S.Actions>
          <S.FieldSet>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>ADMIN</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {filterOperators().map((operator, index) => (
                  <tr key={index}>
                    <td>{operator.name}</td>

                    {/* FIXME: change className to english and invert isActive check */}
                    <td className={!operator.isActive ? 'inativo' : 'ativo'}>
                      <a>{!operator.isActive ? 'Inativo' : 'Ativo'}</a>
                    </td>

                    <td className={operator.isAdmin ? 'sim' : 'nao'}>
                      <a>{operator.isAdmin ? 'Sim' : 'Não'}</a>
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() => {
                          openEditModal(operator.id)
                        }}
                      >
                        <i className="edit-icon"></i>
                      </button>
                      <button
                        onClick={() => {
                          inactivateOperator({ operatorId: operator.id })
                        }}
                        className="delete-button"
                      >
                        <i className="delete-icon"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </S.FieldSet>

          {/* TODO: improve modal, this way is wrong */}
          {isModalVisible ? (
            <NewOperator
              onClose={() => {
                setIsModalVisible(false)
                setSelectedOperatorId(null)
              }}
              selectedOperatorId={selectedOperatorId}
            />
          ) : null}
        </S.Container>
      </S.ContainerFluid>
    </S.Wrapper>
  )
}
