import { ChainId } from '@apeswapfinance/sdk'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from '@apeswapfinance/uikit'
import { ArrowUpCircle } from 'react-feather'
import { AutoColumn } from '../Column'
import { getEtherscanLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'
import Particles from '../RainingBananas/Particles'

export interface TransactionSubmittedContentInterface {
  particles: number[]
}

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  let id = 1

  const [particles, setParticles] = useState<number[]>([])

  const clean = (cleanId: number) => {
    setParticles(particles.filter((_id) => _id !== cleanId))
  }

  useEffect(() => {
    id++
    setParticles((p) => [...p, id])
    setTimeout(() => {
      clean(id)
    }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { innerWidth } = window

  return (
    <>
      {particles.map((particle) => (
        <Particles key={particle} count={Math.floor(innerWidth / 20)} />
      ))}
      <Wrapper>
        <Section>
          <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
          <ConfirmedIcon>
            <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
          </ConfirmedIcon>
          <AutoColumn gap="8px" justify="center">
            {chainId && hash && (
              <LinkExternal href={getEtherscanLink(chainId, hash, 'transaction')}>View on bscscan</LinkExternal>
            )}
            <Button onClick={onDismiss} mt="20px">
              Close
            </Button>
          </AutoColumn>
        </Section>
      </Wrapper>
    </>
  )
}

export default TransactionSubmittedContent
