import React from 'react'
import { tryParseAmount, useDerivedSwapInfo } from 'state/swap/hooks'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { Version } from 'hooks/useToggledVersion'
import { Field } from 'state/swap/actions'
import styled from 'styled-components'
import { useCurrency } from 'hooks/Tokens'
import { useTradeExactOut } from 'hooks/Trades'

const EstimatedPriceDollar = styled.div`
  position: absolute;
  top: 74px;
  font-size: 9px;
  color: ${({ theme }) => theme.colors.textSubtle};
`
const EstimatedSymbol = styled.span`
  font-size: 12px;
  height: 0px;
  display: inline-block;
  line-height: 0.5;
  vertical-align: middle;
`
const CURRENCY_BUSD: any = {
  decimals: 18,
  name: 'BUSD Token',
  symbol: 'BUSD',
	address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
	chainId: 56
}

export default function EstimatedConvertDollar({ currency, typedValue = null }: {currency: any, typedValue: any}) {
  
  const {
    v1Trade,
  } = useDerivedSwapInfo()
	const outputCurrency = useCurrency("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")
	const parsedAmount = tryParseAmount(typedValue, currency);
	const parsedAmount2 = tryParseAmount("1", outputCurrency ?? undefined);
	const bestTradeExactOut = useTradeExactOut(currency, parsedAmount2)

  const v2Trade = bestTradeExactOut
  const { wrapType } = useWrapCallback(
    currency,
    outputCurrency ?? CURRENCY_BUSD,
    typedValue
  )
  
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
	const toggledVersion = Version.v2;
	const trade = showWrap
    ? undefined
    : {
        [Version.v1]: v1Trade,
        [Version.v2]: v2Trade,
      }[toggledVersion]
	
	const parsedAmounts = {
        [Field.INPUT]: trade?.inputAmount || parsedAmount,
        [Field.OUTPUT]: trade?.outputAmount || parsedAmount2,
      }
  const formattedAmounts = {
    [Field.INPUT]: typedValue,
    [Field.OUTPUT]: Math.round((typedValue*(parsedAmounts[Field.OUTPUT]?.numerator[1]/parsedAmounts[Field.INPUT]?.numerator[1])*100)) / 100
  }
	
  return (
    <EstimatedPriceDollar>
      <EstimatedSymbol>~</EstimatedSymbol>
      <span>${formattedAmounts[Field.OUTPUT] || 0}</span>
    </EstimatedPriceDollar>
  )
}
