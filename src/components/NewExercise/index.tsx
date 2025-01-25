import styled from "styled-components"
import { BodyPart } from "../../types/exercise"
import { useState } from "react"
import { NewTrainingProps } from "../../screens/NewTraining"
import { bodyParts } from "../../constants/exercise"

type Props = {
  submitLabel?: string
  onSubmit: (data: NewTrainingProps) => void
}


const NewExercise = ({ onSubmit, submitLabel = 'Começar o treino' }: Props) => {
  const [bodyPart, setBodyPart] = useState<BodyPart | null>(null)
  const [name, setName] = useState<string>('')
  const isFormValid = Boolean(bodyPart && name !== '')

  const handleSubmit = () => {
    onSubmit({ bodyPart: bodyPart as BodyPart, name })
  }

  return (
    <Wrapper>
      <FieldWrapper>
          <select onChange={(e) => setBodyPart(e.target.value as BodyPart)}>
            <option>Parte do corpo</option>
            {bodyParts.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </FieldWrapper>
        <FieldWrapper>
          <input type="text" placeholder="Exercício" onChange={(e) => setName(e.target.value)} />
        </FieldWrapper>
        <FieldWrapper>
          <Start disabled={!isFormValid} onClick={handleSubmit}>{submitLabel}</Start>
      </FieldWrapper>
    </Wrapper>
  )
}

export default NewExercise

const Wrapper = styled.div``

const FieldWrapper = styled.p``

const Start = styled.button``