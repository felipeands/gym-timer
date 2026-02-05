import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

type Props = {
  time: number
  onFinish: () => void
}

const CountDown = ({ time, onFinish }: Props) => {
  const [count, setCount] = useState(time)

  useEffect(() => {
    if (count === 0) {
      onFinish()
      return
    }

    const timer = setTimeout(() => {
      setCount(count - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [count, onFinish])

  return (
    <Container>
      <CountdownNumber key={count} onClick={onFinish}>{count}</CountdownNumber>
      <Label>Prepare-se...</Label>
    </Container>
  )
}

export default CountDown

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--bg-color);
  gap: 24px;
`

const CountdownNumber = styled.h1`
  font-size: 10rem;
  font-weight: 800;
  color: #00FF88;
  margin: 0;
  animation: ${pulse} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 0 40px rgba(0, 255, 136, 0.5);
  cursor: pointer;
  user-select: none;
`

const Label = styled.div`
  font-size: 1.5rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
`