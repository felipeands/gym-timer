import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"

const Running = () => {
  const {
    training,
    exercise,
    getTotalExercises,
    getExerciseTotalCycles,
    newCyclePause
  } = useTrainingContext()

  const totalExercises = getTotalExercises(training)

  const totalCycles = getExerciseTotalCycles(exercise)

  const handleFinishCycle = () => {
    newCyclePause()
  }

  return (
    <Wrapper>
      <h1>{exercise.bodyPart}</h1>
      <p>
        Exercício <b>{totalExercises}</b> {exercise.name}
        <Timer time="02:50" />
      </p>
      <p>
        <div>Repetição <b>{totalCycles}</b></div>
        <Timer time="00:22" />
      </p>

      <p>
        Treino
        <Timer time="28:05" />
      </p>
      <EndCycle onClick={handleFinishCycle}>Finalizar Repetição</EndCycle>
    </Wrapper>
  )
}

export default Running

const Wrapper = styled.div``

const EndCycle = styled.button``
