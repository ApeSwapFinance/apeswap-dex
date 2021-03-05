import React, { useEffect, useRef } from 'react'
import Banana4 from '../BananaSVG/Banana4'

const TOP_OFFSET = window.innerHeight
const LEFT_OFFSET = 250


const generateWholeNumber = (min: number, max: number) => min + Math.floor(Math.random() * (max - min))
  const SIZE_RANGE: [number, number] = [15, 45]
  const ROTATION_RANGE: [number, number] = [-15, 15]

export default class ParticleType2 extends React.PureComponent {

  style: { width: number; height: number; borderRadius: number; transform: string; left: number; top: number; position: string; transition: string }

  private particleType2Ref: React.RefObject<SVGElement>;

  constructor(props) {
    super(props);
    const size = generateWholeNumber(...SIZE_RANGE);
    this.particleType2Ref = React.createRef();
    this.style = {
      width: size,
      height: size,
      borderRadius: size,
      transform: `rotateZ(${generateWholeNumber(...ROTATION_RANGE)}deg)`,
      left: generateWholeNumber(0, window.innerWidth),
      top: generateWholeNumber(-TOP_OFFSET, 0),
      position: 'absolute',
      transition: 'all 5s ease-out',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      /* tslint:disable */
      const node = this.particleType2Ref;
      node.style.top = `${window.innerHeight + generateWholeNumber(0, TOP_OFFSET)}px`;
      node.style.left = `${this.style.left + generateWholeNumber(-LEFT_OFFSET, LEFT_OFFSET)}px`;
    },0);
  }
  
  render() {
    return (
      <Banana4 refBanana4={this.particleType2Ref} style={this.style}/>
    );
  }
}