import SearchIcon from '@/assets/images/search.svg'
import CreateUserPhoneModal from '@/components/CreateUserPhoneModal'
import Header from '@/components/Header'
import Input from '@/components/Input/Input'
import { useLoadNumbersByUserId } from '@/hooks/firebase/useLoadNumbersByUserId'
import { userNumbersState } from '@/recoil/atoms/user'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import * as S from './styles'

export default function MyPhones() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [, setSearchValue] = useState('')
  const [user, setUser] = useState<any>()

  const [userNumbers, setUserNumbers] = useRecoilState(userNumbersState)
  const { mutate } = useLoadNumbersByUserId({
    onSuccess(data) {
      setUserNumbers(data)
    },
  })

  // TODO: improve modals
  const openEditModal = operatorId => {
    setIsModalVisible(true)
  }

  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem('authUser'))
    setUser(parsedUser)
  }, [])

  useEffect(() => {
    if (user) {
      mutate({ userId: user.id })
    }
  }, [user, mutate])

  return (
    <S.Wrapper>
      <S.ContainerFluid>
        <Header title="Meus Celulares" />

        <S.Container>
          <S.Actions>
            <form>
              <Input
                placeholder="Filtre"
                leftIcon={<SearchIcon color="#262931" />}
                onChange={(e: any) => {
                  setSearchValue(e.target.value)
                }}
              />
            </form>

            <S.NewDepartament>
              <button
                type="button"
                onClick={() => {
                  setIsModalVisible(true)
                }}
              >
                + Novo numero
              </button>
            </S.NewDepartament>
          </S.Actions>

          <S.FieldSet>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Número</th>
                  <th>Status</th>
                  <th>Opções</th>
                </tr>
              </thead>

              <tbody>
                {userNumbers?.map(number => (
                  <tr key={number.id}>
                    <td>{number.name}</td>

                    <td>{number.phone}</td>

                    <td className={number.isActive ? 'inativo' : 'ativo'}>
                      <a>{number.isActive ? 'Inativo' : 'Ativo'}</a>
                    </td>

                    <td>
                      <button
                        className="edit-button"
                        onClick={() => {
                          openEditModal(number.id)
                        }}
                      >
                        <i className="edit-icon" />
                      </button>

                      <button
                        onClick={() => {
                          console.warn(number.id)
                        }}
                        className="delete-button"
                      >
                        <i className="delete-icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </S.FieldSet>
          {isModalVisible ? (
            <CreateUserPhoneModal
              onClose={() => {
                setIsModalVisible(false)
                // setSelectedOperatorId(null);
              }}
            />
          ) : null}
        </S.Container>
      </S.ContainerFluid>
    </S.Wrapper>
  )
}
