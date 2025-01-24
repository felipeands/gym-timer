import styled from "styled-components"

type Props = {
  time: string
}

const Timer = ({ time }: Props) => {
  return (<Wrapper>{time}</Wrapper>)
}

export default Timer

const Wrapper = styled.div``