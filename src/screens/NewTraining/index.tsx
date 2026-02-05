import styled from "styled-components"
import { useTrainingContext } from "../../contexts/TrainingContext"
import NewExerciseForm from '../../components/NewExercise'
import { NewExerciseProps } from "../../types/exercise"



const NewExercise = () => {
  const { newTraining, newExercise, newCycle, setCurrentScreen } = useTrainingContext()

  const handleNewTraining = ({ bodyPart, name }: NewExerciseProps) => {
    if (!bodyPart) {
      return
    }
    newTraining()
    newExercise({ bodyPart, name, cycles: [] })
    newCycle({})
    setCurrentScreen('Countdown')
  }

  return (
    <Container>
      <MainContent>
        <ScrollContent>
          <Title>Inicar Novo Treino</Title>
          <Subtitle>Selecione o grupo muscular e o exercício para começar agora.</Subtitle>

          <FormCard>
            <NewExerciseForm
              onSubmit={handleNewTraining}
              submitLabel="Começar o Treino"
              fixedActions
              secondaryAction={
                <HistoryButton onClick={() => setCurrentScreen('History')}>Ver Histórico</HistoryButton>
              }
            />
          </FormCard>
        </ScrollContent>
      </MainContent>
    </Container>)
}

export default NewExercise

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
`

const ScrollContent = styled.div`
  flex: 1;
  padding: 24px 24px 180px 24px;
  overflow-y: auto;
`

const HistoryButton = styled.button`
  background: transparent;
  color: var(--primary-color);
  font-weight: 600;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  line-height: 1.1;
`

const Subtitle = styled.p`
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0 0 40px 0;
  line-height: 1.5;
`

const FormCard = styled.div`
  width: 100%;
  max-width: 100%;
`
