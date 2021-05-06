import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }

  #swap-body{
    background: none;
    border: 1px solid;
    ${({ theme }) => theme.mediaQueries.sm} {
      background: #FFFFFF;
      border: none;
    }
    #swap-currency-input, #swap-currency-output{
      background-color: transparent;
    }
    .container-amounts{
        background-color: rgb(238 234 244 / 70%);
      }
  }
  
`

export default GlobalStyle
