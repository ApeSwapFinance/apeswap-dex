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
  top: 73px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSubtle};
`
const EstimatedSymbol = styled.span`
  font-size: 18px;
  height: 0px;
  display: inline-block;
  line-height: 0.7;
  vertical-align: middle;
`
const CURRENCY_BUSD_ID = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

export default function EstimatedConvertDollar({ currency, typedValue = null }: {currency: any, typedValue: any}) {
  
	const outputCurrency = useCurrency(CURRENCY_BUSD_ID)
	const parsedAmount = tryParseAmount(typedValue, currency);
	const parsedAmount2 = tryParseAmount("1", outputCurrency ?? undefined);
	const trade = useTradeExactOut(currency, parsedAmount2)
	
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
