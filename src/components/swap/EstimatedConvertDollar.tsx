import React, { useEffect, useState } from 'react'
import { tryParseAmount } from 'state/swap/hooks'
import styled from 'styled-components'
import { useCurrency } from 'hooks/Tokens'
import { useTradeExactIn } from 'hooks/Trades'

const EstimatedPriceDollar = styled.div`
  padding: 0rem 0.75rem 0.75rem 1rem;
  display: flex;
  flex-flow: row nowrap;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSubtle};
`
const EstimatedSymbol = styled.span`
  font-size: 18px;
  height: 0px;
  display: inline-block;
  line-height: 1.56;
  vertical-align: middle;
`
const CURRENCY_BUSD_ID = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'

function CalculateRate (currency, typedValue) {
  
  const [totalRate, setTotalRate] = useState(null);
  const inputCurrency = useCurrency(CURRENCY_BUSD_ID)
  const parsedAmount = tryParseAmount('1', inputCurrency ?? undefined)
  const trade = useTradeExactIn(parsedAmount, currency ?? undefined)
  const value = currency?.symbol === 'BUSD' ? 1 : Number(trade?.executionPrice.invert().toSignificant(6))

  const decimals = value < 0.1 ? 1000000000 : 100;
  const rate: any = Number(typedValue) * (Math.round((value) * decimals) / decimals);
  const total = rate > 0.1 ? rate.toFixed(2) : rate;
  useEffect(() => {
    setTotalRate(total);
  }, [total])
  return trade ? totalRate : null;
}

export default function EstimatedConvertDollar({ currency, typedValue = null }: { currency: any; typedValue: any }) {
  
  const totalRate = CalculateRate(currency, typedValue);
  return (
    <EstimatedPriceDollar>
      <EstimatedSymbol>~</EstimatedSymbol>
      {totalRate ? <span>${totalRate || 0}</span> : '-'}
    </EstimatedPriceDollar>
  )
}

