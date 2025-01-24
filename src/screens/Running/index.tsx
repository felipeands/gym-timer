import styled from "styled-components"
import Timer from "../../components/Timer"

const Running = () => {
  return (
    <Wrapper>
      <h1>Biceps</h1>
      <p>
        Exercício <b>5</b> Supino inclinado
        <Timer time="02:50" />
      </p>
      <p>
        <div>Repetição <b>3</b></div>
        <Timer time="00:22" />
      </p>

      <p>
        Treino
        <Timer time="28:05" />
      </p>
      <EndCycle>Finalizar Repetição</EndCycle>
    </Wrapper>
  )
}

export default Running

const Wrapper = styled.div``

const EndCycle = styled.button``
