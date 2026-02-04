import styled from "styled-components"
import { BodyPart, NewExerciseProps } from "../../types/exercise"
import { useState } from "react"
import { bodyParts, exercisesByBodyPart } from "../../constants/exercise"

type Props = {
  submitLabel?: string
  onSubmit: (data: NewExerciseProps) => void
}


const NewExercise = ({ onSubmit, submitLabel = 'Começar o treino' }: Props) => {
  const [bodyPart, setBodyPart] = useState<BodyPart | null>(null)
  const [name, setName] = useState<string>('')
  const isFormValid = Boolean(bodyPart && name !== '')

  const handleBodyPartChange = (value: BodyPart) => {
    setBodyPart(value)
    setName('') // Reset exercise name when body part changes
  }

  const handleSubmit = () => {
    onSubmit({ bodyPart: bodyPart as BodyPart, name })
  }

  const availableExercises = bodyPart ? exercisesByBodyPart[bodyPart] : []

  return (
    <Wrapper>
      <FieldWrapper>
        <select value={bodyPart || ''} onChange={(e) => handleBodyPartChange(e.target.value as BodyPart)}>
          <option value="" disabled>Parte do corpo</option>
          {bodyParts.map((name, index) => (
            <option key={index} value={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</option>
          ))}
        </select>
      </FieldWrapper>
      <FieldWrapper>
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!bodyPart}
        >
          <option value="" disabled>Exercício</option>
          {availableExercises.map((exName, index) => (
            <option key={index} value={exName}>{exName}</option>
          ))}
        </select>
      </FieldWrapper>
      <FieldWrapper>
        <Start disabled={!isFormValid} onClick={handleSubmit}>{submitLabel}</Start>
      </FieldWrapper>
    </Wrapper>
  )
}

export default NewExercise

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const FieldWrapper = styled.div`
  margin: 0;
  width: 100%;

  & select, & input {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #333;
    background: var(--surface-color);
    color: var(--text-color);
    font-size: 1rem;
    font-family: var(--font-main);
    outline: none;
    box-sizing: border-box;
    appearance: none; /* For select on mobile */
    
    &:focus {
      border-color: var(--primary-color);
    }
  }

  & select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
  }
`

const Start = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--primary-color);
  color: #000;
  font-size: 1.25rem;
  font-weight: 700;
  font-family: var(--font-main);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  
  &:disabled {
    background-color: #333;
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`