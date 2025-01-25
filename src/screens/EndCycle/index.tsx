import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"
import NewExerciseForm from "../../components/NewExercise"

const EndCycle = () => {
  const { setCurrentScreen } = useTrainingContext()

  const handleEndTraining = () => {
    setCurrentScreen('EndTraining')
  }

  const handleNewExercise = () => {
    setCurrentScreen('Running')
  }

  const handleNewCycle = () => {
    setCurrentScreen('Running')
  }

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
        <EndCycleButton onClick={handleNewCycle}>Nova repetição</EndCycleButton>
      </p>

      <h3>Novo exercício</h3>
      <NewExerciseForm onSubmit={handleNewExercise} submitLabel="Iniciar exercício" />

      <p>
        Treino
        <Timer time="28:05" />
        <EndTraining onClick={handleEndTraining}>Finalizar treino</EndTraining>
      </p>
    </Wrapper>
  )
}


export default EndCycle

const Wrapper = styled.div``

const EndCycleButton = styled.button``

const EndTraining = styled.button``
