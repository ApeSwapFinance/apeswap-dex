import React, { useState } from 'react'
import { RowBetween } from 'components/Row'
import { ArrowLeft } from 'react-feather'
import { Text } from 'rebass'
import { CloseIcon, ArrowBackIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'
// import { Token } from '@uniswap/sdk'
import { TokenList } from '@uniswap/token-lists'
// import { ManageLists } from './ManageLists'
// import ManageTokens from './ManageTokens'
import { PaddedColumn, Separator } from './styleds'
import ManageLists from './ManageLists'
// import { CurrencyModalView } from './CurrencySearchModal'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 80px;
`

const ToggleWrapper = styled(RowBetween)`
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 12px;
  padding: 6px;
`

const ToggleOption = styled.div<{ active?: boolean }>`
  width: 48%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 600;
  background-color: ${({ theme, active }) => (active ? theme.colors.text : theme.colors.textDisabled)};
  color: ${({ theme, active }) => (active ? theme.colors.textDisabled: theme.colors.text)};
  user-select: none;

  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

export default function Manage({
  onDismiss,
  setShowTokens,
  setImportList,
  setListUrl
}: {
  onDismiss: () => void
  setShowTokens: (s: boolean) => void,
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  // toggle between tokens and lists
  const [showLists, setShowLists] = useState(true)
  
  return (
    <Wrapper>
      <PaddedColumn>
        <RowBetween>
          <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => setShowTokens(true)} />
          <Text fontSize="16px">
            <span>Manage</span>
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
      </PaddedColumn>
      <Separator />
      <PaddedColumn style={{ paddingBottom: 0 }}>
        <ToggleWrapper>
          <ToggleOption onClick={() => setShowLists(!showLists)} active={showLists}>
            Lists
          </ToggleOption>
          <ToggleOption onClick={() => setShowLists(!showLists)} active={!showLists}>
            Tokens
          </ToggleOption>
        </ToggleWrapper>
      </PaddedColumn>
      <ManageLists setImportList={setImportList} setListUrl={setListUrl}/>
      {/* {showLists ? (
        // <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        // <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )} */}
    </Wrapper>
  )
}
