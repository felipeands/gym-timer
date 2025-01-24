import styled from "styled-components"
import Timer from "../../components/Timer"

const Running = () => {
  return (
    <Wrapper>
      <h1>Biceps</h1>
      <p>
        <div>Ciclo <b>3</b></div>
        <Timer time="00:22" />
        <EndCycle>Finalizar Ciclo</EndCycle>
      </p>

      <p>
        Aparelho <b>5</b>
        <Timer time="02:50" />
        <EndExercise>Finalizar aparelho</EndExercise>
      </p>

      <p>
        Treino
        <Timer time="28:05" />
        <EndTraining>Finalizar treino</EndTraining>
      </p>
    </Wrapper>
  )
}


export default Running

const Wrapper = styled.div``

const EndCycle = styled.button``

const EndExercise = styled.button``

const EndTraining = styled.button``