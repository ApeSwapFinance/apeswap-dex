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
    #swap-currency-input, #swap-currency-output{
      background-color: transparent;
    }
    .container-amounts{
      background-color: rgb(238 234 244 / 70%);
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      background: ${({ theme }) => theme.colors.card};
      border: none;
      .container-amounts{
        background-color: ${({ theme }) => theme.colors.input};
        box-shadow: ${({ theme }) => theme.shadows.inset};
      }
      
    }
  }
  
`

export default GlobalStyle
