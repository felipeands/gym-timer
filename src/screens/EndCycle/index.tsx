import { useState, useEffect } from "react"
import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"
import NewExerciseForm from "../../components/NewExercise"
import { NewExerciseProps } from "../../types/exercise"

const EndCycle = () => {
  const {
    training,
    exercise,
    cycle,
    getExerciseTotalCycles,
    getTotalExercises,
    newCycle,
    endCycle,
    endExercise,
    endTraining,
    newExercise,
    setCurrentScreen
  } = useTrainingContext()

  const [restElapsed, setRestElapsed] = useState(0)

  useEffect(() => {
    if (!cycle.pauseAt) return

    const calculate = () => {
      const diff = Math.floor((new Date().getTime() - cycle.pauseAt!.getTime()) / 1000)
      setRestElapsed(diff)
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [cycle.pauseAt])

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
    // Correctly close the active cycle and exercise before starting a new one
    const currentCycleUpdated = { ...cycle, endAt: new Date() }
    const currentExerciseUpdated = {
      ...exercise,
      cycles: [...exercise.cycles, currentCycleUpdated],
      endAt: new Date()
    }

    endExercise(currentExerciseUpdated)
    newExercise({ bodyPart, name, cycles: [] })
    newCycle({})
    setCurrentScreen('Countdown')
  }

  const handleNewCycle = () => {
    endCycle()
    newCycle({})
    setCurrentScreen('Countdown')
  }

  const totalCycles = getExerciseTotalCycles(exercise)
  const totalExercises = getTotalExercises(training)

  const formatDuration = (start?: Date, end?: Date) => {
    if (!start || !end) return "00:00"
    const seconds = Math.floor((end.getTime() - start.getTime()) / 1000)
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const currentExerciseData = { ...exercise, isActive: true }

  // Sort completed exercises by most recent (descending)
  const sortedCompletedExercises = [...training.exercises].reverse()

  const groupedCompletedExercises = sortedCompletedExercises.reduce((acc, current) => {
    const bodyPart = current.bodyPart || 'Outros'
    if (!acc[bodyPart]) {
      acc[bodyPart] = []
    }
    acc[bodyPart].push(current)
    return acc
  }, {} as Record<string, typeof training.exercises>)

  return (
    <Container>
      <Header>
        <StatusTitle>Descansando...</StatusTitle>
      </Header>

      <MainSection>
        <Label>Tempo de Descanso</Label>
        <Timer startDate={cycle.pauseAt} size="massive" variant={restElapsed >= 60 ? 'primary' : 'secondary'} />
        <ProgressWrapper>
          <ProgressBar progress={Math.min((restElapsed / 60) * 100, 100)} />
        </ProgressWrapper>
      </MainSection>

      <StatsGrid>
        <StatCard>
          <Label>Série Anterior</Label>
          <Value>{formatDuration(cycle.startAt, cycle.pauseAt)}</Value>
        </StatCard>
        <StatCard>
          <Label>Total Séries</Label>
          <Value>{totalCycles}</Value>
        </StatCard>
        <StatCard $fullWidth>
          <Label>Treino Total</Label>
          <Timer startDate={training.startAt} size="medium" variant="neutral" />
          <SmallText>#{totalExercises}</SmallText>
        </StatCard>
      </StatsGrid>

      <Actions>
        <PrimaryButton onClick={handleNewCycle}>Nova série</PrimaryButton>
        <SectionDivider>OU</SectionDivider>
        <NewExerciseLabel>Novo Exercício</NewExerciseLabel>
        <NewExerciseForm onSubmit={handleNewExercise} submitLabel="Iniciar" />
        <CompletedExercisesList>
          <SectionLabel>Exercício atual</SectionLabel>
          <GroupContainer>
            <GroupHeader>{currentExerciseData.bodyPart}</GroupHeader>
            <ExerciseItem $isActive={true}>
              <IconWrapper>⏳</IconWrapper>
              <ExerciseInfo>
                <ExerciseName>{currentExerciseData.name}</ExerciseName>
                <SeriesCount>{currentExerciseData.cycles.length + 1} {currentExerciseData.cycles.length + 1 === 1 ? 'série' : 'séries'}</SeriesCount>
              </ExerciseInfo>
            </ExerciseItem>
          </GroupContainer>

          {Object.keys(groupedCompletedExercises).length > 0 && (
            <>
              <SectionLabel style={{ marginTop: '24px' }}>Últimos exercícios</SectionLabel>
              {Object.entries(groupedCompletedExercises).map(([bodyPart, exercises]) => (
                <GroupContainer key={bodyPart}>
                  <GroupHeader>{bodyPart}</GroupHeader>
                  {exercises.map((ex, index) => (
                    <ExerciseItem key={index}>
                      <IconWrapper>✅</IconWrapper>
                      <ExerciseInfo>
                        <ExerciseName>{ex.name}</ExerciseName>
                        <SeriesCount>{ex.cycles.length} {ex.cycles.length === 1 ? 'série' : 'séries'}</SeriesCount>
                      </ExerciseInfo>
                    </ExerciseItem>
                  ))}
                </GroupContainer>
              ))}
            </>
          )}
        </CompletedExercisesList>

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

const StatCard = styled.div<{ $fullWidth?: boolean }>`
  background: var(--surface-color);
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  ${props => props.$fullWidth && `
    grid-column: span 2;
  `}
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
  margin-top: 16px;
  font-weight: 600;
  border: none;
`

const CompletedExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const GroupHeader = styled.h3`
  font-size: 0.875rem;
  color: var(--secondary-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  opacity: 0.8;
`

const ExerciseItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 4px;
`

const IconWrapper = styled.div`
  font-size: 1.25rem;
  padding-top: 2px;
`

const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const ExerciseName = styled.div`
  font-size: 1rem;
  color: var(--text-color);
  font-weight: 600;
`

const SeriesCount = styled.div`
  font-size: 0.8125rem;
  color: var(--text-muted);
`

const SectionLabel = styled.div`
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 8px;
`

const SmallText = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
`

const ProgressWrapper = styled.div`
  width: 100%;
  max-width: 280px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 12px;
`

const ProgressBar = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 1s linear, background-color 1s linear;
  background-color: ${props => {
    const p = props.progress / 100;
    let r, g, b;

    if (p < 0.85) {
      // 0-51s: From Intense red (255, 0, 40) to Yellow (255, 255, 0)
      const ratio = p / 0.85;
      r = 255;
      g = Math.round(255 * ratio);
      b = Math.round(40 * (1 - ratio));
    } else {
      // 51-60s: From Yellow (255, 255, 0) to Brand Green (0, 255, 136)
      const ratio = (p - 0.85) / 0.15;
      r = Math.round(255 * (1 - ratio));
      g = 255;
      b = Math.round(136 * ratio);
    }

    return `rgb(${r}, ${g}, ${b})`;
  }};
`
