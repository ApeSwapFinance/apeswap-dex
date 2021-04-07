import React from 'react'
import styled from 'styled-components'
import { ExternalLink } from 'components/Shared'
import { BASE_APP_URL } from 'components/Menu/config'

const InfoLink = styled(ExternalLink)`
  width: 100%;
  text-decoration: underline;
  color: ${({ theme }: any) => theme.colors.warning};
`
const StyleShowAlert = styled.div<{ show: boolean }>`
  line-height: 18px;
  border: 1px solid;
  border-radius: 35px;
  padding: 18px 22px;
  margin-bottom: 1.5rem;
  margin-top: -1rem;
  width: 100%;
  max-width: 388px;
  display: grid;
  color: ${({ theme }) => theme.colors.textSubtle};
  z-index: 1;
  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(155%)')};
  transition: transform 300ms ease-in-out;
`

export default function SwapAlertSoldBanana({ currencyInputSelected }: any) {
  const showAlert = currencyInputSelected?.symbol === 'BANANA'

  return (
    <StyleShowAlert show={Boolean(showAlert)}>
      <span>Thinking about selling?</span>
      <span>
        Make sure you haven&apos;t missed out on the $BANANA{' '}
        <InfoLink href={`${BASE_APP_URL}/pools`} target="_blank">
          pools!
        </InfoLink>
      </span>
    </StyleShowAlert>
  )
}
