import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"

const Running = () => {
  const { training, getLastExercise, getTotalExercises } = useTrainingContext()

  if (!training) {
    return <></>
  }

  const exercise = getLastExercise(training)
  const totalExercises = getTotalExercises(training)
  // const cycle = getLastCycle(exercise)

  return (
    <Wrapper>
      <h1>{exercise?.bodyPart}</h1>
      <p>
        Exercício <b>{totalExercises}</b> {exercise?.name}
        <Timer time="02:50" />
      </p>
      <p>
        <div>Repetição <b>3</b></div>
        <Timer time="00:22" />
      </p>

      <p>
        Treino
        <Timer time="28:05" />
      </p>
      <EndCycle>Finalizar Repetição</EndCycle>
    </Wrapper>
  )
}

export default Running

const Wrapper = styled.div``

const EndCycle = styled.button``
