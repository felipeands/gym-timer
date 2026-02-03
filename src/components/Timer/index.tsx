import { useEffect, useState } from "react"
import styled, { css } from "styled-components"

type Props = {
  time?: string
  startDate?: Date
  size?: 'small' | 'medium' | 'large' | 'massive'
  variant?: 'primary' | 'secondary' | 'neutral'
}

const Timer = ({ time, startDate, size = 'medium', variant = 'neutral' }: Props) => {
  const [elapsed, setElapsed] = useState<number>(0)

  useEffect(() => {
    if (!startDate) return

    const calculateElapsed = () => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - startDate.getTime()) / 1000)
      setElapsed(diff >= 0 ? diff : 0)
    }

    calculateElapsed()
    const interval = setInterval(calculateElapsed, 1000)

    return () => clearInterval(interval)
  }, [startDate])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')

    if (h > 0) {
      return `${h}:${m}:${s}`
    }
    return `${m}:${s}`
  }

  const displayTime = startDate ? formatTime(elapsed) : time

  return (<Wrapper size={size} variant={variant}>{displayTime}</Wrapper>)
}

export default Timer

const Wrapper = styled.div<{ size: string, variant: string }>`
  font-family: var(--font-mono);
  font-weight: 700;
  line-height: 1;
  font-feature-settings: "tnum" on, "lnum" on; /* Tabular numbers */
  
  ${props => props.variant === 'primary' && css`color: var(--primary-color);`}
  ${props => props.variant === 'secondary' && css`color: var(--secondary-color);`}
  ${props => props.variant === 'neutral' && css`color: var(--text-color);`}

  ${props => props.size === 'small' && css`font-size: 1.5rem;`}
  ${props => props.size === 'medium' && css`font-size: 2.5rem;`}
  ${props => props.size === 'large' && css`font-size: 4rem;`}
  ${props => props.size === 'massive' && css`font-size: 6rem; letter-spacing: -2px;`}
`