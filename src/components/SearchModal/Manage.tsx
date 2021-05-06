import React from 'react'
import { RowBetween } from 'components/Row'
import { Text } from 'rebass'
import { CloseIcon, ArrowBackIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { PaddedColumn, Separator } from './styleds'
// import ManageLists from './ManageLists'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 80px;
`

export default function Manage({
  onDismiss,
  setShowTokens
}: {
  onDismiss: () => void
  setShowTokens: (s: boolean) => void
}) {
  
  return (
    <Wrapper>
      <PaddedColumn>
        <RowBetween>
          <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => setShowTokens(true)} />
          <Text fontSize="16px">
            <span>BUIDL Tokens</span>
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
      </PaddedColumn>
      <Separator />
      {/* <ManageLists setImportList={setImportList} setListUrl={setListUrl}/> */}
    </Wrapper>
  )
}
