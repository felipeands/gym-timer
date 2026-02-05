import styled from "styled-components"
import Timer from "../../components/Timer"
import { useTrainingContext } from "../../contexts/TrainingContext"

const Running = () => {
  const {
    training,
    exercise,
    cycle,
    getTotalExercises,
    getExerciseTotalCycles,
    newCyclePause,
    setCurrentScreen
  } = useTrainingContext()

  const totalExercises = getTotalExercises(training)
  const totalCycles = getExerciseTotalCycles(exercise)

  const handleFinishCycle = () => {
    newCyclePause()
    setCurrentScreen('EndCycle')
  }

  return (
    <Container>
      <ScrollContent>
        <Header>
          <ExerciseTitle>{exercise.name}</ExerciseTitle>
          <BodyPartBadge>{exercise.bodyPart}</BodyPartBadge>
        </Header>

        <MainSection>
          <Label>Série {totalCycles}</Label>
          <Timer startDate={cycle.startAt} size="massive" variant="primary" />
        </MainSection>

        <StatsGrid>
          <StatCard>
            <Label>Exercício</Label>
            <Timer startDate={exercise.startAt} size="medium" />
          </StatCard>
          <StatCard>
            <Label>Treino Total</Label>
            <Timer startDate={training.startAt} size="medium" variant="neutral" />
            <SmallText>#{totalExercises}</SmallText>
          </StatCard>
        </StatsGrid>
      </ScrollContent>

      <Footer>
        <ActionButton onClick={handleFinishCycle}>Finalizar Série</ActionButton>
      </Footer>
    </Container>
  )
}

export default Running

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
  padding: 0 0 120px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
  margin-bottom: 2rem;
`

const ExerciseTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
`

const BodyPartBadge = styled.span`
  background: var(--surface-color);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  color: var(--text-muted);
  text-transform: capitalize;
`

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
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
  margin-bottom: 2rem;
  padding: 0 24px;
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

const SmallText = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
`

const Footer = styled.footer`
  padding: 24px;
  background: linear-gradient(to top, var(--bg-color) 80%, transparent);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`

const ActionButton = styled.button`
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
