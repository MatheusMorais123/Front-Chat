import { useState } from 'react'
import * as S from './styles'
import LogoOpen from '../../assets/images/LogoOpen.svg'
import Call from '../../assets/images/call.svg'
import Campanha from '../../assets/images/campanha.svg'
import Click from '../../assets/images/click.svg'
import Close from '../../assets/images/close.svg'
import FAQ from '../../assets/images/fag.svg'
import Funil from '../../assets/images/funil.svg'
import Home from '../../assets/images/home.svg'
import Logo from '../../assets/images/logo.svg'
import Link from 'next/link'

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(prevState => !prevState)
  }

  return (
    <S.Left sidebarOpen={sidebarOpen}>
      <S.Toogle>
        <button onClick={handleSidebarToggle}>
          {sidebarOpen ? <Close width="100" /> : <Click width="100" />}
        </button>

        <a className="logo">
          {sidebarOpen ? <LogoOpen width="158" /> : <Logo width="100" />}
        </a>
      </S.Toogle>

      <ul>
        {/* <li className='logo'>
            {sidebarOpen ? (
              <LogoOpen width="158" />

            ) : (
              <Logo width="100" />
            )}
          </li> */}
        <li>
          {sidebarOpen ? (
            <a>
              <Home width="100" />

              <span>Home</span>
            </a>
          ) : (
            <a>
              <Home width="100" />
            </a>
          )}
        </li>

        <li>
          {sidebarOpen ? (
            <Link href="/departament">
              <Campanha width="100" />

              <span>Departamentos</span>
            </Link>
          ) : (
            <a>
              <Campanha width="100" />
            </a>
          )}
        </li>

        <li>
          {sidebarOpen ? (
            <Link href="/my-phones">
              <Call width="100" />

              <span>Meus Celulares</span>
            </Link>
          ) : (
            <a>
              <Call width="100" />
            </a>
          )}
        </li>

        <li>
          {sidebarOpen ? (
            <Link href="/operators">
              <FAQ width="100" />

              <span>Operadores</span>
            </Link>
          ) : (
            <a>
              <FAQ width="100" />
            </a>
          )}
        </li>

        <li>
          {sidebarOpen ? (
            <a>
              <Funil width="100" />

              <span>Funil</span>
            </a>
          ) : (
            <a>
              <Funil width="100" />
            </a>
          )}
        </li>

        <li>
          {sidebarOpen ? (
            <a>
              <Call width="100" />

              <span>Ligações</span>
            </a>
          ) : (
            <a>
              <Call width="100" />
            </a>
          )}
        </li>
      </ul>
    </S.Left>
  )
}

export default Sidebar
