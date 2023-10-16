import { useRouter } from 'next/router'

type PrivateRouteProps = {
  children: any
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    const authUser = JSON.parse(localStorage.getItem('authUser'))

    if (!authUser) {
      router.push('/login')
      return null
    }
  }

  return <>{children}</>
}

export default PrivateRoute
