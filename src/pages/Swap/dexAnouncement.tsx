import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import Card from 'components/Card'

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Accent = styled.div`
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FeaturedCardAccent = styled(Accent)`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
`

const CardHolder = styled.div`
  align-self: center;
  background: ${(props) => props.theme.card.background};
  box-shadow: 0px 1px 4px rgba(25, 19, 38, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  margin-bottom: 50px;
  border-radius: 10px;
  position: relative;
  text-align: center;
`

export default function DexAnouncement() {
  return (
    <a
      href="https://ape-swap.medium.com/iao-005-hifi-retro-defi-games-695a5a215ee3"
      target="_blank"
      rel="noopener noreferrer"
    >
      <CardHolder>
        <Card>
          <Text textAlign="center" fontSize="1.25em">
            🚨 Initial Ape Offering 005 🚨
          </Text>
          <Text textAlign="center" fontSize=".8em">
            June 11th 03:00 UTC
          </Text>
          <Text textAlign="center" fontSize=".8em">
            Mark your calendars to get in on two offerings of the retro gaming project HiFi DeFi
            👾🕹️
          </Text>
          <FeaturedCardAccent />
        </Card>
      </CardHolder>
    </a>
  )
}
