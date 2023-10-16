import SearchIcon from '@/assets/images/search.svg'
import Header from '@/components/Header'
import Input from '@/components/Input/Input'
import NewDepartament from '@/components/NewDepartament'
import { useInactivateDepartament } from '@/hooks/firebase/useInactivateDepartament'
import { useLoadDepartamentsByUserId } from '@/hooks/firebase/useLoadDepartamentsByUserId'
import { userDepartamentsState } from '@/recoil/atoms/user'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import PrivateRoute from '../../helpers/PrivateRoute'
import * as S from './styles'

export default function Departament() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDepartamentId, setselectedDepartamentId] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [setToUpdate] = useState(false)
  const [userDepartaments, setUserDepartaments] = useRecoilState(
    userDepartamentsState,
  )

  const { mutate: loadDepartamentsByUserId } = useLoadDepartamentsByUserId({
    onSuccess(data) {
      setUserDepartaments(data)
    },
    onError(error) {
      console.log({ error })
    },
  })

  const { mutate: inactivateDepartament } = useInactivateDepartament({
    onSuccess(data) {
      setUserDepartaments(previousState => [data, ...previousState])
    },
    onError(error) {
      console.log({ error })
    },
  })

  const getFilteredDepartament = () => {
    const filtered = userDepartaments.filter(dep =>
      dep.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    return filtered
  }

  // TODO: edit departament don't work, fix this
  const openEditModal = (departamentId: any) => {
    setselectedDepartamentId(departamentId)
    setIsModalVisible(true)
  }

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    const id = authUser ? authUser.id : null

    loadDepartamentsByUserId({ userId: id })
  }, [loadDepartamentsByUserId])

  return (
    <S.Wrapper>
      <PrivateRoute>
        <S.ContainerFluid>
          <Header title="Departamentos" />

          <S.Container>
            <S.Actions>
              <form>
                <Input
                  placeholder="Filtre por operador"
                  leftIcon={<SearchIcon color="#262931" />}
                  onChange={e => {
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
                  + Novo departamento
                </button>
              </S.NewDepartament>
            </S.Actions>

            <S.FieldSet>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>

                    <th>Status</th>

                    <th>Opções</th>
                  </tr>
                </thead>

                <tbody>
                  {getFilteredDepartament().map(departament => (
                    <tr key={departament.id}>
                      <td>{departament.name}</td>

                      <td
                        className={departament.isActive ? 'inativo' : 'ativo'}
                      >
                        <a>{departament.isActive ? 'Inativo' : 'Ativo'}</a>
                      </td>

                      <td>
                        <button
                          className="edit-button"
                          onClick={() => {
                            openEditModal(departament.id)
                          }}
                        >
                          <i className="edit-icon"></i>
                        </button>

                        <button
                          onClick={() => {
                            inactivateDepartament({
                              departamentId: departament.id,
                            })
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

            {isModalVisible ? (
              <NewDepartament
                onClose={() => {
                  setIsModalVisible(false)
                  setselectedDepartamentId(null)
                }}
                selectedDepartamentId={selectedDepartamentId}
                setToUpdate={setToUpdate}
              />
            ) : null}
          </S.Container>
        </S.ContainerFluid>
      </PrivateRoute>
    </S.Wrapper>
  )
}
