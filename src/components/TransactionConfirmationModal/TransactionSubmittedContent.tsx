import { ChainId } from '@apeswapfinance/sdk'
import React, { useContext, useEffect, useCallback, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, LinkExternal, Image } from '@apeswapfinance/uikit'
import { ArrowUpCircle } from 'react-feather'
import { AutoColumn } from '../Column'
import { getEtherscanLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'
import BananaTree from '../../assets/images/bananaTree.jpg'
import Particles from '../RainingBananas/Particles'


type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  // const id = 1;
  
  const[particles, setParticles] = useState<Array<any>>([])
    
  const {innerWidth} = window

  const cleanScreen = useCallback(() => {
    const clean =(id) => {
      setParticles(particles.filter(_id => _id !== id))
    }

    let id = 1;
    id++;
    setParticles([particles, id])
    setTimeout(() => {
      clean(id);
    }, 5000);
  }, [particles])



  useEffect(() => {
    cleanScreen()
  }, [cleanScreen])


  return (
    <Wrapper>
      {/* <img src={BananaTree} 
      alt="Banana Tree"
      style={{
        	background: BananaTree,
          height: '100vh',
          zIndex: -100
      }} /> */}
                {particles.map(id => (
            <Particles key={id} count={Math.floor(innerWidth / 20)}/>
          ))}
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
  )
}

export default TransactionSubmittedContent
