import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${() => css`
    width: 100%;
    height: 230px;
    background: #22bf66;
  `}
`
export const Left = styled.div<{ sidebarOpen: boolean }>`
  ${({ sidebarOpen }) => css`
    margin-right: 0 !important;
    min-width: ${sidebarOpen ? '220px' : '80px'};
    max-width: ${sidebarOpen ? '220px' : '80px'};
    height: 100vh;
    min-height: 570px;
    background-color: #f8f9fa;
    display: flex;
    z-index: 9;
    box-shadow: 0 2px 4px rgba(15, 34, 58, 0.12);

    ul {
      position: absolute;
      top: 30%;
      left: 7px;
      width: 93%;
      display: flex;
      flex-direction: column;
      gap: 4%;
      height: 100%;

      li {
        text-decoration: none;
        list-style: none;
        padding: 10px 0px 10px 10px;
        display: flex;
        align-items: center;
        height: 48px;

        a {
          position: relative;
          display: block;
          width: 100%;
          display: flex;
          text-decoration: none;
          color: #6c757d;
          cursor: pointer;

          span {
            color: #6c757d;
            font-size: 16px;
            left: 20%;
            position: absolute;
          }
        }

        &:hover {
          background: #b3e5c9;
          padding: 5px 0px 5px 5px;
          border-right: 4px solid #1ea659;
          border-radius: 5px;
        }
      }

      .logo {
        padding-top: 50px;
        padding-bottom: 30px;
      }
    }
  `}
`
export const Image = styled.div`
  ${() => css`
    width: 100px;
    height: 200px;
  `}
`

export const Toogle = styled.div`
  ${() => css`
    margin-top: 2rem;

    button {
      border: none;
      background: none;
      margin: 10px 20px 10px 20px;
    }

    a {
      padding: 1rem;

      > svg {
        margin-top: 2rem;
      }
    }
  `}
`
