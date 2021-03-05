import React, { useEffect, useRef } from 'react'
import ParticleType1 from './ParticleType1'
import ParticleType2 from './ParticleType2'

const generateWholeNumber = (min: number, max: number) => min + Math.floor(Math.random() * (max - min))

interface ParticleProps {
    count?: number
  }

class Particles extends React.PureComponent<ParticleProps> {
  render() {
    let { count: n } = this.props
    const particles = [] as any;
    const types = [ParticleType1, ParticleType2, ParticleType2]

    while (n && n--) {
      const Particle = types[generateWholeNumber(0, 3)]
      particles.push(<Particle key={n} />)
    }

    return (
      <div
        className="particles"
        style={{
          position: 'fixed',
          top: 0,
        }}
      >
        {particles}
      </div>
    )
  }
}

export default Particles
