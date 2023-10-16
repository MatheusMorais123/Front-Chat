import logo from '@/assets/images/Logo.png'
import { toast } from '@/helpers/toast/toast.helper'
import { useCreateUser } from '@/hooks/firebase/useCreateUser'
import { CreateUserDTO } from '@/hooks/firebase/useCreateUser/types'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'
import { useFormik } from 'formik'
import router from 'next/router'
import { useState } from 'react'
import * as Yup from 'yup'
import { auth } from '../../helpers/firebase'
import * as S from './styles'
export default function Register() {
  const [error, setError] = useState('')

  const { mutate: createUser } = useCreateUser({
    onSuccess() {
      toast({
        type: 'success',
        message: 'Usuário criado com sucesso, acesse com suas credenciais',
      })
      router.push('/')
    },
    onError() {
      toast({
        type: 'error',
        message: 'Algo deu errado, tente novamente.',
      })
    },
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Por favor digite o e-mail'),
      password: Yup.string().required('Por favor digite a senha'),
    }),
    onSubmit: async values => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        )

        const userDto: CreateUserDTO = {
          id: userCredential.user.uid,
          name: values.name,
          email: values.email,
          isActive: true,
          isAdmin: true,
          created_at: Timestamp.now(),
          emailIsVerified: userCredential.user.emailVerified,
        }

        createUser(userDto)
      } catch (error) {
        // TODO: improve validation errors
        if (error.code === 'auth/email-already-in-use') {
          setError('Este e-mail já está em uso por outro usuário.')
        } else if (error.code === 'auth/weak-password') {
          setError('A senha deve ter pelo menos 6 caracteres.')
        } else {
          console.log(error)
          setError('Ocorreu um erro ao registrar o usuário.')
        }
      }
    },
  })

  return (
    <S.ContainerFluid>
      <S.Left>
        <S.LoginForm onSubmit={formik.handleSubmit}>
          <S.Image src={logo.src} />

          <S.LoginTitle>Faça login para continuar</S.LoginTitle>

          <S.FormGroup>
            <S.Label htmlFor="email">Nome *</S.Label>

            <S.TextInput
              type="text"
              id="name"
              name="name"
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

          <S.FormGroup>
            <S.Label htmlFor="email">E-mail *</S.Label>

            <S.TextInput
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>
                <S.Error>{formik.errors.email}</S.Error>
              </div>
            ) : null}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="password">Senha *</S.Label>

            <S.TextInput
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>
                <S.Error>{formik.errors.password}</S.Error>
              </div>
            ) : null}
          </S.FormGroup>

          {error && (
            <S.Validate>
              <p>{error}</p>
            </S.Validate>
          )}

          <S.LoginButton type="submit">Entrar</S.LoginButton>

          <S.LinksContainer>
            <S.ForgotPasswordLink href="#">
              Esqueci a senha
            </S.ForgotPasswordLink>

            <S.CreateAccountLink href="/">Login</S.CreateAccountLink>
          </S.LinksContainer>
        </S.LoginForm>
      </S.Left>
    </S.ContainerFluid>
  )
}
