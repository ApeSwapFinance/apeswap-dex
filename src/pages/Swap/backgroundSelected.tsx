import React from 'react'
import styled from 'styled-components'
import CurrencyLogo from 'components/CurrencyLogo'

interface BackgroudCurrencyPropo {
    currencyInput?: any | null,
    currencyOutput?: any | null
}

const CoinInputSelected = styled.div<{ showInput: boolean; image?: string }>`
    position: absolute;
    left: 0px;
    width: 50%;
    top: 135px;
    height: 445px;
    opacity: 0.25;
    display: ${({ showInput }) => (showInput ? '' : 'none')};
    background: url(${({ image }) => (image)});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`
const CoinOutputSelected = styled.div<{ showInput: boolean; image?: string }>`
    position: absolute;
    right: 0px;
    width: 50%;
    top: 135px;
    height: 445px;
    opacity: 0.25;
    display: ${({ showInput }) => (showInput ? '' : 'none')};
    background: url(${({ image }) => (image)});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`
function getImage(currency) {
    
    if(!currency) return '';

    return `/images/coins/${currency.symbol}.svg`;
}

export default function BackgroudSelectedCoin({
    currencyInput,
    currencyOutput
}: BackgroudCurrencyPropo) {
  
    const currencyIn = currencyInput;
    const currencyOut = currencyOutput;
  return (
    <>
    <CoinInputSelected showInput={Boolean(currencyIn)} image={getImage(currencyIn)} />
    <CoinOutputSelected showInput={Boolean(currencyOut)} image={getImage(currencyOut)} />
    </>
  )
}
