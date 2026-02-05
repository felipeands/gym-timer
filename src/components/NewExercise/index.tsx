import styled from "styled-components"
import { BodyPart, NewExerciseProps } from "../../types/exercise"
import { useState, useMemo } from "react"
import { bodyParts, exercisesByBodyPart } from "../../constants/exercise"
import { useTrainingContext } from "../../contexts/TrainingContext"

type Props = {
  submitLabel?: string
  onSubmit: (data: NewExerciseProps) => void
  secondaryAction?: React.ReactNode
  fixedActions?: boolean
}


const NewExercise = ({ onSubmit, submitLabel = 'Começar o treino', secondaryAction, fixedActions }: Props) => {
  const { training, exercise: activeExercise } = useTrainingContext()
  const [bodyPart, setBodyPart] = useState<BodyPart | null>(null)
  const [name, setName] = useState<string>('')

  const completedExercises = useMemo(() => {
    const names = new Set(training.exercises.map(ex => ex.name))
    if (activeExercise.name) {
      names.add(activeExercise.name)
    }
    return names
  }, [training.exercises, activeExercise.name])
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
    <Wrapper $fixedActions={fixedActions}>
      <Fields>
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
            {availableExercises.map((exName, index) => {
              const isCompleted = completedExercises.has(exName)
              return (
                <option key={index} value={exName}>
                  {exName} {isCompleted ? '✅' : ''}
                </option>
              )
            })}
          </select>
        </FieldWrapper>
      </Fields>
      <Actions $fixed={fixedActions}>
        <Start disabled={!isFormValid} onClick={handleSubmit}>{submitLabel}</Start>
        {secondaryAction}
      </Actions>
    </Wrapper>
  )
}

export default NewExercise

const Wrapper = styled.div<{ $fixedActions?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  ${props => props.$fixedActions && `
    padding-bottom: 20px;
  `}
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`

const Actions = styled.div<{ $fixed?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  ${props => props.$fixed ? `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    background: linear-gradient(to top, var(--bg-color) 80%, transparent);
    z-index: 10;
  ` : `
    width: 100%;
  `}
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
  background-color: #00FF88;
  color: #000000;
  font-size: 1.25rem;
  font-weight: 700;
  font-family: var(--font-main);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  display: block;
  
  &:not(:disabled):hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:disabled {
    background-color: #333;
    color: #666;
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:active:not(:disabled) {
    transform: scale(0.98) translateY(0);
  }
`