import React, { memo, useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { Settings, CheckCircle } from 'react-feather'
import { usePopper } from 'react-popper'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { TokenList } from '@uniswap/token-lists'
// import { useListColor } from 'hooks/useColor'
import Card from 'components/Card'
import { BUIDL_TOKEN_LIST_URL, UNSUPPORTED_LIST_URLS } from 'constants/lists'
import ListToggle from 'components/Toggle/ListToggle'
import { useFetchListCallback } from '../../hooks/useFetchListCallback'
// import { // useOnClickOutside } from '../../hooks/// useOnClickOutside'
import useToggle from '../../hooks/useToggle'
import { AppDispatch, AppState } from '../../state'
import { acceptListUpdate, removeList, disableList, enableList } from '../../state/lists/actions'
import { useIsListActive, useAllLists, useActiveListUrls } from '../../state/lists/hooks'
// import { ExternalLink, LinkStyledButton, TYPE, IconWrapper } from '../../theme'
import listVersionLabel from '../../utils/listVersionLabel'
import { parseENSAddress } from '../../utils/parseENSAddress'
import uriToHttp from '../../utils/uriToHttp'
// import { ButtonEmpty, ButtonPrimary } from '../Button'

import Column, { AutoColumn } from '../Column'
import ListLogo from '../ListLogo'
import Row, { RowFixed, RowBetween } from '../Row'
import { PaddedColumn, SearchInput, Separator, SeparatorDark } from './styleds'
import useTheme from '../../hooks/useTheme'
// import ListToggle from '../Toggle/ListToggle'
// import { CurrencyModalView } from './CurrencySearchModal'
const Base = styled.button<{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  padding: ${({ padding }) => (padding || '18px')};
  width: ${({ width }) => (width || '100%')};
  font-weight: 500;
  text-align: center;
  border-radius: 20px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`
export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.colors.text : theme.colors.textDisabled)};
  font-weight: 500;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`

const Wrapper = styled(Column)`
  width: 100%;
  height: 100%;
`

const UnpaddedLinkStyledButton = styled(LinkStyledButton)`
  padding: 0;
  font-size: 1rem;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`

const PopoverContainer = styled.div<{ show: boolean }>`
  z-index: 100;
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  opacity: ${props => (props.show ? 1 : 0)};
  transition: visibility 150ms linear, opacity 150ms linear;
  background: ${({ theme }) => theme.colors.textDisabled};
  border: 1px solid ${({ theme }) => theme.colors.textDisabled};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 8px;
  font-size: 1rem;
  text-align: left;
`

const StyledMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`

const StyledTitleText = styled.div<{ active: boolean }>`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: ${({ theme, active }) => (active ? theme.colors.textDisabled : theme.colors.text)};
`

const StyledListUrlText = styled.div<{ active: boolean }>`
  font-size: 12px;
  color: ${({ theme, active }) => (active ? theme.colors.textDisabled : theme.colors.text)};
`

const RowWrapper = styled(Row)<{ bgColor?: string; active?: boolean }>`
  background-color: ${({ bgColor, active, theme }) => (active ? bgColor ?? theme.colors.text : '#f7ebe8')};
  transition: 200ms;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
`
export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

function listUrlRowHTMLId(listUrl: string) {
  return `list-row-${listUrl.replace(/\./g, '-')}`
}

const ListRow = memo(function ListRow({ listUrl }: { listUrl: string }) {
  const listsByUrl = useSelector<AppState, AppState['lists']['byUrl']>(state => state.lists.byUrl)

  const dispatch = useDispatch<AppDispatch>()
  const { current: list, pendingUpdate: pending } = listsByUrl[listUrl]

  const theme = useTheme()
  // const listColor = useListColor(list?.logoURI)
  const isActive = useIsListActive(listUrl)
  
  const [open, toggle] = useToggle(true)
  const node = useRef<HTMLDivElement>()
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement>()
  const [popperElement, setPopperElement] = useState<HTMLDivElement>()

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'auto',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [8, 8] } }]
  })
  // useOnClickOutside(node, open ? toggle : undefined)

  // const handleAcceptListUpdate = useCallback(() => {
  //   if (!pending) return
  //   ReactGA.event({
  //     category: 'Lists',
  //     action: 'Update List from List Select',
  //     label: listUrl
  //   })
  //   dispatch(acceptListUpdate(listUrl))
  // }, [dispatch, listUrl, pending])

  // const handleRemoveList = useCallback(() => {
  //   ReactGA.event({
  //     category: 'Lists',
  //     action: 'Start Remove List',
  //     label: listUrl
  //   })
  //   if (window.prompt(`Please confirm you would like to remove this list by typing REMOVE`) === `REMOVE`) {
  //     ReactGA.event({
  //       category: 'Lists',
  //       action: 'Confirm Remove List',
  //       label: listUrl
  //     })
  //     dispatch(removeList(listUrl))
  //   }
  // }, [dispatch, listUrl])

  const handleEnableList = useCallback(() => {
    dispatch(enableList(listUrl))
  }, [dispatch, listUrl])

  const handleDisableList = useCallback(() => {
    dispatch(disableList(listUrl))
  }, [dispatch, listUrl])

  if (!list || list.name === 'apeswap') return null

  return (
    <RowWrapper active={isActive} key={listUrl} id={listUrlRowHTMLId(listUrl)}>
      {list.logoURI ? (
        <ListLogo size="40px" style={{ marginRight: '1rem' }} logoURI={list.logoURI} alt={`${list.name} list logo`} />
      ) : (
        <div style={{ width: '24px', height: '24px', marginRight: '1rem' }} />
      )}
      <Column style={{ flex: '1' }}>
        <Row>
          <StyledTitleText active={isActive}>{list.name}</StyledTitleText>
        </Row>
        <RowFixed mt="4px">
          <StyledListUrlText active={isActive}>
            {list.tokens.length} tokens
          </StyledListUrlText>
        </RowFixed>
      </Column>
      <ListToggle
        isActive={isActive}
        bgColor={theme.theme.colors.text}
        toggle={() => {
          // eslint-disable-next-line no-unused-expressions
          isActive ? handleDisableList() : handleEnableList()
        }}
      />
    </RowWrapper>
  )
})

const ListContainer = styled.div`
  padding: 1rem;
  height: 100%;
  overflow: auto;
  padding-bottom: 80px;
`
export default function ManageLists({
  setImportList,
  setListUrl
}: {
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  const theme = useTheme()

  const [listUrlInput, setListUrlInput] = useState<string>('')

  const lists = useAllLists()

  // sort by active but only if not visible
  const activeListUrls = useActiveListUrls()
  const [activeCopy, setActiveCopy] = useState<string[] | undefined>()
  useEffect(() => {
    if (!activeCopy && activeListUrls) {
      setActiveCopy(activeListUrls)
    }
  }, [activeCopy, activeListUrls])

  const handleInput = useCallback(e => {
    setListUrlInput(e.target.value)
  }, [])

  const fetchList = useFetchListCallback()

  const validUrl: boolean = useMemo(() => {
    return uriToHttp(listUrlInput).length > 0 || Boolean(parseENSAddress(listUrlInput))
  }, [listUrlInput])

  const sortedLists = useMemo(() => {
    const listUrls = Object.keys(lists)
    return listUrls
      .filter(listUrl => {
        // only show loaded lists, hide unsupported lists
        // return Boolean(lists[listUrl].name === BUIDL_TOKEN_LIST_URL)
        // eslint-disable-next-line no-extra-boolean-cast
        return Boolean(lists[listUrl].current) && !Boolean(UNSUPPORTED_LIST_URLS.includes(listUrl))
      })
      .sort((u1, u2) => {
        const { current: l1 } = lists[u1]
        const { current: l2 } = lists[u2]

        // first filter on active lists
        if (activeCopy?.includes(u1) && !activeCopy?.includes(u2)) {
          return -1
        }
        if (!activeCopy?.includes(u1) && activeCopy?.includes(u2)) {
          return 1
        }

        if (l1 && l2) {
          return l1.name.toLowerCase() < l2.name.toLowerCase()
            ? -1
            : l1.name.toLowerCase() === l2.name.toLowerCase()
            ? 0
            : 1
        }
        if (l1) return -1
        if (l2) return 1
        return 0
      })
  }, [lists, activeCopy])
  // temporary fetched list for import flow
  const [tempList, setTempList] = useState<TokenList>()
  const [addError, setAddError] = useState<string | undefined>()

  useEffect(() => {
    async function fetchTempList() {
      fetchList(listUrlInput)
        .then(list => setTempList(list))
        .catch(() => setAddError('Error importing list'))
    }
    // if valid url, fetch details for card
    if (validUrl) {
      fetchTempList()
    } else {
      setTempList(undefined)
      // listUrlInput !== '' && setAddError('Enter valid list location')
    }

    // reset error
    if (listUrlInput === '') {
      setAddError(undefined)
    }
  }, [fetchList, listUrlInput, validUrl])

  // check if list is already imported
  const isImported = Object.keys(lists).includes(listUrlInput)

  return (
    <Wrapper>
      {tempList && (
        <PaddedColumn style={{ paddingTop: 0 }}>
          <Card backgroundColor='white' padding="12px 20px">
            <RowBetween>
              <RowFixed>
                {tempList.logoURI && <ListLogo logoURI={tempList.logoURI} size="40px" />}
              </RowFixed>
            </RowBetween>
          </Card>
        </PaddedColumn>
      )}
      <Separator />
      <ListContainer>
        <AutoColumn gap="md">
          {sortedLists.map(listUrl => (
            <ListRow key={listUrl} listUrl={listUrl} />
          ))}
        </AutoColumn>
      </ListContainer>
    </Wrapper>
  )
}
