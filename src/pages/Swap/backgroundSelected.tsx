import React from 'react'
import styled from 'styled-components'

interface BackgroudCurrencyPropo {
    currencyInput?: any | null,
    currencyOutput?: any | null
}
// PX position with dex banner
// 415 280 582 280
const CoinInputSelected = styled.div<{ showInput: boolean; image?: string }>`
    position: absolute;
    width: 135px;
    top: 215px;
    height: 135px;
    opacity: 0.25;
    display: ${({ showInput }) => (showInput ? '' : 'none')};
    background: url(${({ image }) => (image)});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    ${({ theme }) => theme.mediaQueries.sm} {
        left: 0px;
        top: 135px;
        width: 50%;
        height: 445px;
    }
`
const CoinOutputSelected = styled.div<{ showInput: boolean; image?: string }>`
    position: absolute;
    width: 135px;
    top: 382px;
    height: 135px;
    opacity: 0.25;
    display: ${({ showInput }) => (showInput ? '' : 'none')};
    background: url(${({ image }) => (image)});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    ${({ theme }) => theme.mediaQueries.sm} {
        right: 0px;
        top: 135px;
        width: 50%;
        bottom: 85px;
        height: 445px;
    }
` 
function getImage(currency) {
    
    if(!currency) return '';
    const image = currency.tokenInfo?.logoURI ? currency.tokenInfo?.logoURI as string : `/images/coins/${currency?.symbol ?? 'token'}.svg`
    return image;
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
