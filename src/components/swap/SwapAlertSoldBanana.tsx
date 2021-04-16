import React from 'react'
import styled from 'styled-components'
import { BASE_APP_URL } from 'components/Menu/config'

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 450;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`
const StyleShowAlert = styled.div<{ show: boolean }>`
  line-height: 18px;
  border: 1px solid;
  border-radius: 35px;
  padding: 18px 22px;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 388px;
  display: grid;
  color: ${({ theme }) => theme.colors.textSubtle};
  z-index: 1;
  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(255%)')};
  display: ${({ show }) => (show ? 'inline-block' : 'none')};
  transition: transform 300ms ease-in-out;
`

export default function SwapAlertSoldBanana({ currencyInputSelected }: any) {
  const showAlert = currencyInputSelected?.symbol === 'BANANA'

  return (
    <StyleShowAlert show={Boolean(showAlert)}>
      <span>Thinking about selling?</span>
      <p>
        Make sure you haven&apos;t missed out on the $BANANA{' '}
        <StyledLink href={`${BASE_APP_URL}/pools`}>
          pools!
        </StyledLink>
      </p>
    </StyleShowAlert>
  )
}
