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
      <Header>
        <ExerciseTitle>{exercise.name}</ExerciseTitle>
        <BodyPartBadge>{exercise.bodyPart}</BodyPartBadge>
      </Header>

      <MainSection>
        <Label>Repetição {totalCycles}</Label>
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

      <Footer>
        <ActionButton onClick={handleFinishCycle}>Finalizar Repetição</ActionButton>
      </Footer>
    </Container>
  )
}

export default Running

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Ensure it takes full viewport height and doesn't scroll the container itself unless overflow */
  background-color: var(--bg-color);
  color: var(--text-color);
  position: relative;
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
  background-color: var(--bg-color); 
  margin-top: auto;
  z-index: 10;
`

const ActionButton = styled.button`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--primary-color);
  color: #000;
  font-size: 1.25rem;
  font-weight: 700;
  transition: transform 0.1s active;
  
  &:active {
    transform: scale(0.98);
  }
`
