import React, { useCallback } from 'react'
import styled from 'styled-components'

import monkeyIcon1 from '../../assets/svg/monkey/monkey1.svg'
import monkeyIcon2 from '../../assets/svg/monkey/monkey2.svg'
import monkeyIcon3 from '../../assets/svg/monkey/monkey3.svg'

const getThumbIcon = (value: number) => {
  let thumbIcon
  if(value >= 0 && value < 34) {
    thumbIcon = monkeyIcon1
  } else if (value > 34 &&  value < 64 ) {
    thumbIcon = monkeyIcon2
  } else {
    thumbIcon = monkeyIcon3
  }
  return thumbIcon
}

const StyledRangeInput = styled.input<{ size: number, thumbIcon: string }>`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 35px;
    width: 35px;
    background: transparent;
    background-image: url(${({ thumbIcon }) => thumbIcon });
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.invertedContrast};

  }

  &::-moz-range-thumb {
    height: 35px;
    width: 35px;
    background-image: url(${({ thumbIcon }) => thumbIcon });
    color: ${({ theme }) => theme.colors.invertedContrast};
    background-color: transparent;
    border: none;
  }

  &::-ms-thumb {
    height: 35px;
    width: 35px;
    background: transparent;
    background-image: url(${({ thumbIcon }) => thumbIcon });
    color: ${({ theme }) => theme.colors.invertedContrast};

  }

  &::-webkit-slider-runnable-track {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primaryDark},
      ${({ theme }) => theme.colors.tertiary}
    );
    height: 2px;
  }

  &::-moz-range-track {
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primaryDark},
      ${({ theme }) => theme.colors.tertiary}
    );
    height: 2px;
  }

  &::-ms-track {
    width: 100%;
    border-color: transparent;
    color: transparent;

    background: ${({ theme }) => theme.colors.primaryDark};
    height: 2px;
  }
  &::-ms-fill-lower {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  &::-ms-fill-upper {
    background: ${({ theme }) => theme.colors.tertiary};
  }
`

interface InputSliderProps {
  value: number
  onChange: (value: number) => void
  step?: number
  min?: number
  max?: number
  size?: number
}

export default function Slider({ value, onChange, min = 0, step = 1, max = 100, size = 28 }: InputSliderProps) {
  const changeCallback = useCallback(
    e => {
      onChange(parseInt(e.target.value))
    },
    [onChange]
  )

  const thumbIcon = getThumbIcon(value)

  return (
    <StyledRangeInput
      size={size}
      thumbIcon={thumbIcon}
      type="range"
      value={value}
      style={{ width: '90%', marginLeft: 15, marginRight: 15, padding: '15px 0' }}
      onChange={changeCallback}
      aria-labelledby="input slider"
      step={step}
      min={min}
      max={max}
    />
  )
}
