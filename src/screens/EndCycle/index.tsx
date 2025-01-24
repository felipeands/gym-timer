import styled from "styled-components"
import Timer from "../../components/Timer"

const EndCycle = () => {
  return (
    <Wrapper>
      <h1>Biceps</h1>
      <p>
        Exercício <b>5</b> Supino inclinado
        <Timer time="02:50" />
      </p>
      <p>
        <div>Descanso</div>
        <Timer time="00:11" />
      </p>
      <p>
        <div>Repetição <b>3</b></div>
        <Timer time="00:22" />
        <EndCycleButton>Iniciar nova repetição</EndCycleButton>
      </p>

      <FieldWrapper>
        <h3>Novo exercício</h3>
        <select>
          <option>Parte do corpo</option>
          <option>Ombro</option>
          <option>Peito</option>
          <option>Costas</option>
          <option>Biceps</option>
          <option>Triceps</option>
        </select>
      </FieldWrapper>
      <FieldWrapper>
        <input type="text" placeholder="Exercício" />
      </FieldWrapper>
      <FieldWrapper>
        <Start>Começar o exercício</Start>
      </FieldWrapper>

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

const EndTraining = styled.button``

const FieldWrapper = styled.p``

const Start = styled.button``