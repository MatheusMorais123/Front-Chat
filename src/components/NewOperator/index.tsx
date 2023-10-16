import { Timestamp } from 'firebase/firestore'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import MultiSelect from '../MultiSelect'
import * as S from './styles'

import { toast } from '@/helpers/toast/toast.helper'
import { useCreateOperator } from '@/hooks/firebase/useCreateOperator'
import { CreateOperatorDTO } from '@/hooks/firebase/useCreateOperator/types'
import { useLoadNumbersByUserId } from '@/hooks/firebase/useLoadNumbersByUserId'
import { useUpdateOperator } from '@/hooks/firebase/useUpdateOperator'
import { UpdateOperatorDTO } from '@/hooks/firebase/useUpdateOperator/types'
import { userNumbersState, userOperatorsState } from '@/recoil/atoms/user'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { auth } from '../../helpers/firebase'
import { NewOperatorProps } from './types'

const NewOperator = ({ onClose, selectedOperatorId }: NewOperatorProps) => {
  const [isEditMode] = useState(!!selectedOperatorId)
  const [selectedNumbers, setSelectedNumbers] = useState<any>()
  const [user, setUser] = useState<any>()
  const setOperators = useSetRecoilState(userOperatorsState)

  const [userNumbers, setUserNumbers] = useRecoilState(userNumbersState)
  const { mutate: loadNumbersByUserId } = useLoadNumbersByUserId({
    onSuccess(data) {
      setUserNumbers(data)
    },
    onError(error) {
      console.log({ error })
      toast({ type: 'error', message: 'Error ao carregar numeros.' })
    },
  })

  const { mutate: createOperator } = useCreateOperator({
    onSuccess(data) {
      setOperators(previousState => [data, ...previousState])
      toast({ type: 'success', message: 'Operador criado com successo.' })
    },
    onError(error) {
      console.log({ error })
      toast({
        type: 'error',
        message: 'Erro ao criar operador, tente novamente.',
      })
    },
  })

  const { mutate: updateOperator } = useUpdateOperator({
    onSuccess(data) {
      setOperators(previousState => {
        const updatedOperators = previousState.map(operator => {
          if ((operator.id = data.id)) {
            return data
          }

          return operator
        })

        return updatedOperators
      })
      toast({ type: 'success', message: 'Operador atualizado com successo' })
    },
    onError(error) {
      console.log({ error })
      toast({
        type: 'error',
        message: 'Erro ao atualizar operador, tente novamente.',
      })
    },
  })

  // TODO: Fix edit operator modal, that is not working
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      numbers: null,
      password: '',
      isActive: false,
      isAdmin: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('O nome é obrigatório'),
      email: Yup.string()
        .email('Entre com o e-mail')
        .required('Este campo é obrigatório'),
      password: Yup.string().required('Este campo é obrigatório'),
      isAdmin: Yup.boolean().required('Required'),
    }),
    onSubmit: async values => {
      const numbers = selectedNumbers?.map(number => number.value)
      try {
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        const userId = authUser?.id

        if (isEditMode && selectedOperatorId) {
          const operatorDto: UpdateOperatorDTO = {
            id: selectedOperatorId,
            name: values.name,
            email: values.email,
            numbers,
            isActive: true,
            isAdmin: values.isAdmin,
            userId,
            updatedAt: Timestamp.now(),
          }

          updateOperator(operatorDto)
        } else {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password,
          )

          const operatorDto: CreateOperatorDTO = {
            id: user.uid,
            name: values.name,
            email: values.email,
            numbers,
            password: values.password,
            isActive: true,
            isAdmin: values.isAdmin,
            userId,
            updatedAt: Timestamp.now(),
            createdAt: Timestamp.now(),
            emailVerified: user.emailVerified,
          }

          createOperator(operatorDto)
        }
        setSelectedNumbers(null)
        formik.resetForm()
        onClose()
      } catch (error) {
        toast({
          type: 'error',
          message: 'Erro ao cadastrar operador, tente novamente.',
        })
        console.log({ error })
      }
    },
  })

  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem('authUser'))
    setUser(parsedUser)
  }, [])

  useEffect(() => {
    if (user) {
      loadNumbersByUserId({ userId: user.id })
    }
  }, [user, loadNumbersByUserId])

  return (
    <S.Modal>
      <S.Content>
        <S.Row>
          <S.Title>
            {isEditMode ? 'Editar operador' : 'Adicionar operador'}
          </S.Title>

          <button onClick={onClose} className="close">
            X
          </button>
        </S.Row>

        <form onSubmit={formik.handleSubmit}>
          <p>Preencha os campos abaixo para adicionar um novo operador.</p>

          <S.FormGroup>
            <S.TextInput
              type="text"
              name="name"
              id="name"
              placeholder="Nome do operador"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </S.FormGroup>

          {formik.touched.name && formik.errors.name ? (
            <S.Error>{formik.errors.name}</S.Error>
          ) : null}

          <S.FormGroup>
            <S.TextInput
              type="text"
              name="email"
              id="email"
              placeholder="Digite o e-mail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </S.FormGroup>

          {formik.touched.email && formik.errors.email ? (
            <S.Error>{formik.errors.email}</S.Error>
          ) : null}

          {!isEditMode && (
            <S.FormGroup>
              <S.TextInput
                type="password"
                placeholder="Digite a senha"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              {formik.touched.email && formik.errors.email ? (
                <div>
                  <S.Error>{formik.errors.email}</S.Error>
                </div>
              ) : null}
            </S.FormGroup>
          )}

          <MultiSelect
            placeholder="Select a number"
            isMulti
            options={userNumbers?.map(number => ({
              label: number.name,
              value: number.phone,
            }))}
            onChange={value => {
              setSelectedNumbers(value)
            }}
          />

          <S.Label>Administrador</S.Label>

          <S.Admin>
            <S.Label>Sim</S.Label>

            <S.TextInput
              className="radio"
              type="radio"
              id="isAdminYes"
              name="isAdmin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="true"
              checked={formik.values.isAdmin}
            />

            <S.Label>Não</S.Label>

            <S.TextInput
              className="radio"
              type="radio"
              id="isAdminNo"
              name="isAdmin"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value="false"
              checked={!formik.values.isAdmin}
            />
          </S.Admin>

          <S.Footer>
            <button className="cancel" onClick={onClose}>
              Cancelar
            </button>

            <button type="submit">Adicionar operador</button>
          </S.Footer>
        </form>
      </S.Content>
    </S.Modal>
  )
}

export default NewOperator
