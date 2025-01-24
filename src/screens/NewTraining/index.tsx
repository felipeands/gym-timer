import styled from "styled-components"

const NewExercise = () => {
  return (
    <Wrapper>
      <h1>
        Novo treino
      </h1>
      <FieldWrapper>
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
        <Start>Começar o treino</Start>
      </FieldWrapper>
    </Wrapper>)
}

export default NewExercise

const Wrapper = styled.div``

const FieldWrapper = styled.p``

const Start = styled.button``