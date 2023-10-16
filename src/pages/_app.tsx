import { initFirebaseBackend } from '@/helpers/firebase'
import { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global'
import { Providers } from '@/utils/provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

initFirebaseBackend()
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <GlobalStyle />
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Providers>
  )
}
