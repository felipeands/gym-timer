import styled from "styled-components"
import EndTrainingButton from "../../components/EndTrainingButton"

const NewExercise = () => {
  return (
    <Wrapper>
      <h1>
        Próximo aparelho
      </h1>
      <p>Anterior: Ombro</p>
      <FieldWrapper>
      <select>
        <option>Ombro</option>
        <option>Peito</option>
        <option>Costas</option>
        <option>Biceps</option>
        <option>Triceps</option>
      </select>
      </FieldWrapper>
      <FieldWrapper>
        <Start>Começar treino</Start>
      </FieldWrapper>
      <FieldWrapper>
        <EndTrainingButton />
      </FieldWrapper>
    </Wrapper>)
}

export default NewExercise

const Wrapper = styled.div``

const FieldWrapper = styled.p``

const Start = styled.button``