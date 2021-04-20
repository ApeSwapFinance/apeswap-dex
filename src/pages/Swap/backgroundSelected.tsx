import React from 'react'
import styled from 'styled-components'
import CurrencyLogo from 'components/CurrencyLogo'

interface BackgroudCurrencyPropo {
    currencyInput?: any | null,
    currencyOutput?: any | null
}

const CoinInputSelected = styled.div<{ showInput: boolean }>`
    position: absolute;
    left: 0px;
    width: 50%;
    top: 155px;
    opacity: 0.2;
    display: ${({ showInput }) => (showInput ? '' : 'none')}
`
const CoinOutputSelected = styled.div<{ showInput: boolean }>`
    position: absolute;
    right: 0px;
    width: 50%;
    top: 155px;
    opacity: 0.2;
    display: ${({ showInput }) => (showInput ? '' : 'none')}
`

export default function BackgroudSelectedCoin({
    currencyInput,
    currencyOutput
}: BackgroudCurrencyPropo) {
  
    const currencyIn = currencyInput;
    const currencyOut = currencyOutput;
  return (
    <>
    <CoinInputSelected showInput={Boolean(currencyIn)}>
        <CurrencyLogo currency={currencyIn} size="400px" style={{ position: 'absolute', right: '0px' }} />
    </CoinInputSelected>
    <CoinOutputSelected showInput={Boolean(currencyOut)}>
        <CurrencyLogo currency={currencyOut} size="400px" style={{ marginRight: '8px' }} />
    </CoinOutputSelected>
    </>
  )
}


