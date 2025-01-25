import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"

const EndTraining = () => {
  const { setCurrentScreen } = useTrainingContext()

  const handleNewTraining = () => {
    setCurrentScreen('NewTraining')
  }

  return (
    <Wrapper>
      <p>
        <div>Total Repetições <b>21</b></div>
      </p>

      <p>
        Total Exercícios <b>7</b>
      </p>

        <NewTraining onClick={handleNewTraining}>Novo treino</NewTraining>

      <p>
        Treino total
        <Timer time="49:03" />
        Total exercitando
        <Timer time="43:30" />
        Total descanso
        <Timer time="06:40" />
      </p>
      <DiscartTraining>Descartar treino</DiscartTraining>
    </Wrapper>
  )
}


export default EndTraining

const Wrapper = styled.div``

const NewTraining = styled.button``

const DiscartTraining = styled.button``