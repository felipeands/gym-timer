import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"

const EndTraining = () => {
  const { setCurrentScreen, training, newTraining } = useTrainingContext()

  const handleNewTraining = () => {
    setCurrentScreen('NewTraining')
  }

  const handleDiscardTraining = () => {
    newTraining()
    setCurrentScreen('NewTraining')
  }

  const totalExercises = training.exercises.length

  const totalCycles = training.exercises.reduce((acc, curr) => acc + curr.cycles.length, 0)

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`
  }

  const trainingDurationSeconds = training.startAt && training.endAt
    ? Math.floor((training.endAt.getTime() - training.startAt.getTime()) / 1000)
    : 0

  const exercisingDurationSeconds = training.exercises.reduce((acc, exercise) => {
    return acc + exercise.cycles.reduce((cycleAcc, cycle) => {
      if (cycle.startAt && cycle.pauseAt) {
        return cycleAcc + ((cycle.pauseAt.getTime() - cycle.startAt.getTime()) / 1000)
      }
      return cycleAcc
    }, 0)
  }, 0)

  const restDurationSeconds = trainingDurationSeconds - exercisingDurationSeconds

  return (
    <Container>
      <Header>
        <Title>Treino Finalizado</Title>
        <DateText>{new Date().toLocaleDateString()}</DateText>
      </Header>

      <StatsGrid>
        <HighlightCard>
          <Label>Duração Total</Label>
          <Timer time={formatTime(trainingDurationSeconds)} size="large" variant="primary" />
        </HighlightCard>

        <StatCard>
          <Label>Exercícios</Label>
          <Value>{totalExercises}</Value>
        </StatCard>
        <StatCard>
          <Label>Séries</Label>
          <Value>{totalCycles}</Value>
        </StatCard>
        <StatCard>
          <Label>Tempo Ativo</Label>
          <Value>{formatTime(Math.floor(exercisingDurationSeconds))}</Value>
        </StatCard>
        <StatCard>
          <Label>Descanso</Label>
          <Value>{formatTime(Math.max(0, Math.floor(restDurationSeconds)))}</Value>
        </StatCard>
      </StatsGrid>

      <Actions>
        <PrimaryButton onClick={handleNewTraining}>Salvar</PrimaryButton>
        <TextButton onClick={handleDiscardTraining}>Descartar</TextButton>
      </Actions>
    </Container>
  )
}

export default EndTraining

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
  background-color: var(--bg-color);
  color: var(--text-color);
`

const Header = styled.header`
  margin-bottom: 32px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0 8px 0;
  font-weight: 800;
`

const DateText = styled.div`
  color: var(--text-muted);
  font-size: 0.875rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: auto;
`

const HighlightCard = styled.div`
  grid-column: 1 / -1;
  background: var(--surface-color);
  padding: 24px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

const StatCard = styled.div`
  background: var(--surface-color);
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const Label = styled.div`
  color: var(--text-muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const Value = styled.div`
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`

const PrimaryButton = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: #00FF88;
  color: #000000;
  font-size: 1.25rem;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  
  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.98) translateY(0);
  }
`

const TextButton = styled.button`
  background: transparent;
  color: var(--secondary-color);
  padding: 16px;
  font-size: 1rem;
`