import styled from "styled-components"
import Timer from "../../components/Timer"

const EndCycle = () => {
  return (
    <Wrapper>
      <h1>Biceps</h1>
      <p>
        <div>Descanso</div>
        <Timer time="00:11" />
      </p>
      <p>
        <div>Ciclo <b>3</b></div>
        <Timer time="00:22" />
        <EndCycleButton>Iniciar novo Ciclo</EndCycleButton>
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


export default EndCycle

const Wrapper = styled.div``

const EndCycleButton = styled.button``

const EndExercise = styled.button``

const EndTraining = styled.button``