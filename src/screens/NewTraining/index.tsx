import { useState } from "react"
import styled from "styled-components"
import { BodyPart } from "../../types/exercise"
import { Training } from "../../types/training"
import { useTrainingContext } from "../../contexts/TrainingContext"

const bodyParts: BodyPart[] = ['ombro' , 'peito' , 'costas' , 'biceps' , 'triceps' , 'trapezio' , 'antebraço' , 'panturrilha' , 'coxa' , 'gluteos']

const NewExercise = () => {

  const [bodyPart, setBodyPart] = useState<BodyPart | null>(null)
  const [name, setName] = useState<string>('')
  const isFormValid = Boolean(bodyPart && name !== '')

  const { newTraining } = useTrainingContext()

  const handleNewTraining = () => {
    if (!bodyPart) {
      return
    }

    const training: Training = {
      execises: [{
        bodyPart,
        name,
        cycles: [{
          startAt: new Date()
        }]
      }]
    }
    console.log(training)
    newTraining(training)
  }

  return (
    <Wrapper>
      <h1>
        Novo treino
      </h1>
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
        <Start disabled={!isFormValid} onClick={handleNewTraining}>Começar o treino</Start>
      </FieldWrapper>
    </Wrapper>)
}

export default NewExercise

const Wrapper = styled.div``

const FieldWrapper = styled.p``

const Start = styled.button``