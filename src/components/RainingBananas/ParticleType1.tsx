import React, { useEffect, useRef } from 'react'
import Banana1 from '../BananaSVG/Banana1'

const TOP_OFFSET = window.innerHeight;
const LEFT_OFFSET = 250;

const generateWholeNumber = (min: number, max: number) => min + Math.floor(Math.random()*(max - min));

const SIZE_RANGE: [number, number] = [20, 70];
const ROTATION_RANGE: [number, number]  = [0, 45];

export default class ParticleType1 extends React.PureComponent {

  style: { width: number; height: number; transform: string; left: number; top: number; position: string; transition: string; };

  private particleType1Ref: React.RefObject<SVGElement>;


  constructor(props) {
    super(props);
    const size = generateWholeNumber(...SIZE_RANGE);
    this.particleType1Ref = React.createRef();
    this.style = {
      width: size,
      height: size,
      transform: `rotateZ(${generateWholeNumber(...ROTATION_RANGE)}deg)`,
      left: generateWholeNumber(0, window.innerWidth),
      top: generateWholeNumber(-TOP_OFFSET, 0),
      position: 'absolute',
      transition: 'all 5s ease-out'
    };
  }

  componentDidMount() {
    const {left} = this.style;
    setTimeout(() => {
      const node = this.particleType1Ref 
      node.style.top= `${window.innerHeight + generateWholeNumber(0, TOP_OFFSET)}px`;
      node.style.left = `${left + generateWholeNumber(-LEFT_OFFSET, LEFT_OFFSET)}px`;
      node.style.transform = `rotateZ(${generateWholeNumber(...ROTATION_RANGE)}deg)`;
    },0);
  }
  
  render() {
    return (
      <Banana1 refBanana1={this.particleType1Ref} style={this.style}/>
      )
  }
}


