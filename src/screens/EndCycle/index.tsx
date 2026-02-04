import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"
import NewExerciseForm from "../../components/NewExercise"
import { NewExerciseProps } from "../../types/exercise"

const EndCycle = () => {
  const {
    exercise,
    cycle,
    getExerciseTotalCycles,
    newCycle,
    endCycle,
    endExercise,
    endTraining,
    newExercise,
    setCurrentScreen
  } = useTrainingContext()

  const handleEndTraining = () => {
    // Correctly close the active cycle and exercise before ending training
    const currentCycleUpdated = { ...cycle, endAt: new Date() }
    const currentExerciseUpdated = {
      ...exercise,
      cycles: [...exercise.cycles, currentCycleUpdated],
      endAt: new Date()
    }

    // Pass the final state directly to endTraining to avoid async state issues
    endTraining(currentExerciseUpdated)
  }

  const handleNewExercise = ({ bodyPart, name }: NewExerciseProps) => {
    endCycle()
    endExercise()
    newExercise({ bodyPart, name, cycles: [] })
    newCycle({ startAt: new Date() })
    setCurrentScreen('Running')
  }

  const handleNewCycle = () => {
    endCycle()
    newCycle({ startAt: new Date() })
    setCurrentScreen('Running')
  }

  const totalCycles = getExerciseTotalCycles(exercise)

  const formatDuration = (start?: Date, end?: Date) => {
    if (!start || !end) return "00:00"
    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000)
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  return (
    <Container>
      <Header>
        <StatusTitle>Descansando...</StatusTitle>
      </Header>

      <MainSection>
        <Label>Tempo de Descanso</Label>
        <Timer startDate={cycle.pauseAt} size="massive" variant="secondary" />
      </MainSection>

      <StatsGrid>
        <StatCard>
          <Label>Repetição Anterior</Label>
          <Value>{formatDuration(cycle.startAt, cycle.pauseAt)}</Value>
        </StatCard>
        <StatCard>
          <Label>Total Repetições</Label>
          <Value>{totalCycles}</Value>
        </StatCard>
      </StatsGrid>

      <Actions>
        <PrimaryButton onClick={handleNewCycle}>Nova repetição</PrimaryButton>
        <SectionDivider>OU</SectionDivider>
        <NewExerciseLabel>Novo Exercício</NewExerciseLabel>
        <NewExerciseForm onSubmit={handleNewExercise} submitLabel="Iniciar" />
        <TextButton onClick={handleEndTraining}>Finalizar Treino</TextButton>
      </Actions>
    </Container>
  )
}

export default EndCycle

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 24px;
  background-color: var(--bg-color);
  color: var(--text-color);
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`

const StatusTitle = styled.h1`
  font-size: 2rem;
  color: var(--secondary-color);
  margin: 0;
  font-weight: 600;
`

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
`

const Label = styled.div`
  color: var(--text-muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
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

const Value = styled.div`
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 700;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const SectionDivider = styled.div`
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  margin: 32px 0 8px 0;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #333;
  }
  &::before { left: 0; }
  &::after { right: 0; }
`

const NewExerciseLabel = styled.div`
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.125rem;
`

const TextButton = styled.button`
  background: transparent;
  color: var(--secondary-color);
  padding: 16px;
  font-size: 1rem;
  margin-top: 32px;
  font-weight: 600;
`
