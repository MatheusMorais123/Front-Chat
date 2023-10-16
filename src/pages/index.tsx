import logo from '@/assets/images/Logo.png'
import { useSignIn } from '@/hooks/firebase/useSignIn'
import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import * as S from '../pages/login/styles'
import { toast } from '@/helpers/toast/toast.helper'
export default function Login() {
  const [error, setError] = useState('')
  const { mutate } = useSignIn({
    onSuccess() {
      toast({ type: 'success', message: 'Bem-vindo ao DevChat' })
    },
    onError(error: any) {
      // TODO: improve this, maybe use react hook form instead of formik
      if (error.message === 'auth/wrong-password') {
        console.error('Email ou senha inválidos.')
        setError('Email ou senha inválidos.')
      } else if (error.message === 'auth/user-not-found') {
        console.error('Usuário não encontrado.')
        setError('E-mail não encontrado.')
      } else if (error.message === 'auth/email-already-in-use') {
        console.error('Este e-mail já está em uso por outro usuário.')
        setError('Este e-mail já está em uso por outro usuário.')
      } else if (error.message === 'auth/weak-password') {
        console.error('A senha deve ter pelo menos 6 caracteres.')
        setError('A senha deve ter pelo menos 6 caracteres.')
      } else {
        console.error('Ocorreu um erro ao fazer login:', error)
        setError('Ocorreu um erro ao fazer login.')
      }
    },
  })

  // TODO: improve this, maybe use react hook form instead of formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Por favor digite o e-mail'),
      password: Yup.string().required('Por favor digite a senha'),
    }),
    onSubmit: async values => {
      const { email, password } = values
      mutate({ email, password })
    },
  })

  return (
    <S.ContainerFluid>
      <S.Left>
        <S.LoginForm onSubmit={formik.handleSubmit}>
          <S.Image src={logo.src} />

          <S.LoginTitle>Faça login para continuar</S.LoginTitle>

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

            <S.CreateAccountLink href="/register">
              Criar conta
            </S.CreateAccountLink>
          </S.LinksContainer>
        </S.LoginForm>
      </S.Left>
    </S.ContainerFluid>
  )
}
