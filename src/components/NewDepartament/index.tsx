import { useCreateDepartament } from '@/hooks/firebase/useCreateDepartament'
import { useEditDepartament } from '@/hooks/firebase/useEditDepartament'
import { EditDepartamentDTO } from '@/hooks/firebase/useEditDepartament/types'
import { userDepartamentsState } from '@/recoil/atoms/user'
import { Timestamp, doc, getDoc } from 'firebase/firestore'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import * as Yup from 'yup'
import { _firestore } from '../../helpers/firebase'
import * as S from './styles'
import { NewDepartamentProps } from './types'

const NewDepartament = ({
  onClose,
  selectedDepartamentId,
  setToUpdate,
}: NewDepartamentProps) => {
  const [isEditMode] = useState(!!selectedDepartamentId)
  const setDepartaments = useSetRecoilState(userDepartamentsState)

  const { mutate: createDepartament } = useCreateDepartament({
    onSuccess(data) {
      setDepartaments(previousState => [data, ...previousState])
    },
    onError(error) {
      console.log({ error })
    },
  })

  const { mutate: editDepartament } = useEditDepartament({
    onSuccess(data) {
      setDepartaments(previousState => {
        const updatedDepartaments = previousState.map(departament => {
          if ((departament.id = data.id)) {
            return data
          }

          return departament
        })

        return updatedDepartaments
      })
    },
    onError(error) {
      console.log({ error })
    },
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      isActive: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('O nome é obrigatório'),
    }),
    onSubmit: async values => {
      try {
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        const userId = authUser?.id

        const departamentData: EditDepartamentDTO = {
          name: values.name,
          isActive: false,
          user_id: userId,
          updatedAt: Timestamp.now(),
          createdAt: Timestamp.now(),
        }

        // TODO: improve this, the isEditMode is a wrong impplementation
        if (isEditMode && selectedDepartamentId) {
          departamentData.id = selectedDepartamentId
          editDepartament(departamentData)
        } else {
          createDepartament(departamentData)
        }

        formik.resetForm()
      } catch (error) {
        console.error('Erro ao cadastrar/atualizar operador:', error)
        console.log(error)
      }
    },
  })

  useEffect(() => {
    if (selectedDepartamentId) {
      const collectionName = 'departaments'
      const departamentRef = doc(
        _firestore,
        collectionName,
        selectedDepartamentId,
      )

      getDoc(departamentRef)
        .then(docSnapshot => {
          if (docSnapshot.exists()) {
            const selectedDepartament = docSnapshot.data()
            formik.setValues({
              name: selectedDepartament.name,
              isActive: selectedDepartament.isActive,
            })
          }
        })
        .catch(error => {
          console.error('Erro ao obter detalhes do departamento:', error)
        })
    }
  }, [selectedDepartamentId, formik])

  return (
    <S.Modal>
      <S.Content>
        <S.Row>
          <S.Title>
            {isEditMode ? 'Editar departamento' : 'Adicionar departamento'}
          </S.Title>

          <button onClick={onClose} className="close">
            X
          </button>
        </S.Row>

        <form onSubmit={formik.handleSubmit}>
          <p>Preencha os campos abaixo para adicionar um novo departamento</p>

          <S.FormGroup>
            <S.TextInput
              type="text"
              name="name"
              id="name"
              placeholder="Nome do departamento"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            {formik.touched.name && formik.errors.name ? (
              <div>
                <S.Error>{formik.errors.name}</S.Error>
              </div>
            ) : null}
          </S.FormGroup>

          <S.Footer>
            <button className="cancel" onClick={onClose}>
              Cancelar
            </button>

            <button>Adicionar departamento</button>
          </S.Footer>
        </form>
      </S.Content>
    </S.Modal>
  )
}

export default NewDepartament
