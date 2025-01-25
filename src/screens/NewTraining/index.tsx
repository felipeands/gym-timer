import styled from "styled-components"
import { BodyPart } from "../../types/exercise"
import { useTrainingContext } from "../../contexts/TrainingContext"
import NewExerciseForm from '../../components/NewExercise'

export type NewTrainingProps = {
  bodyPart: BodyPart
  name: string
}

const NewExercise = () => {
  const { newTraining, newExercise, newCycle, setCurrentScreen } = useTrainingContext()

  const handleNewTraining = ({ bodyPart, name }: NewTrainingProps) => {
    if (!bodyPart) {
      return
    }
    newTraining()
    newExercise({ bodyPart, name, cycles: [] })
    newCycle({ startAt: new Date() })
    setCurrentScreen('Running')
  }

  return (
    <Wrapper>
      <h1>
        Novo treino
      </h1>
      <NewExerciseForm onSubmit={handleNewTraining} />
    </Wrapper>)
}

export default NewExercise

const Wrapper = styled.div``
