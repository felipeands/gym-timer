import styled from "styled-components"
import { useTrainingContext } from "../../contexts/TrainingContext"
import Timer from "../../components/Timer"

const History = () => {
  const { history, setCurrentScreen, deleteTraining } = useTrainingContext()

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`
  }

  const getDuration = (start?: Date, end?: Date) => {
    if (!start || !end) return 0
    return Math.floor((end.getTime() - start.getTime()) / 1000)
  }

  const handleDelete = (training: any) => {
    if (window.confirm('Deseja realmente excluir este treino do histórico?')) {
      deleteTraining(training.startAt)
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => setCurrentScreen('NewTraining')}>← Voltar</BackButton>
        <Title>Histórico</Title>
      </Header>

      <List>
        {history.length === 0 ? (
          <EmptyState>Nenhum treino registrado ainda.</EmptyState>
        ) : (
          history.map((training, index) => (
            <TrainingCard key={index}>
              <CardHeader>
                <InfoGroup>
                  <DateLabel>{training.startAt?.toLocaleDateString()}</DateLabel>
                  <DurationLabel>{formatTime(getDuration(training.startAt, training.endAt))}</DurationLabel>
                </InfoGroup>
                <DeleteButton onClick={() => handleDelete(training)} title="Excluir treino">×</DeleteButton>
              </CardHeader>
              <ExercisesList>
                {(training.exercises || []).map((ex, i) => (
                  <ExerciseItem key={i}>
                    <ExerciseInfo>
                      <ExerciseName>{ex.name}</ExerciseName>
                      <ExerciseMeta>{ex.cycles.length} séries • {formatTime(getDuration(ex.startAt, ex.endAt))}</ExerciseMeta>
                    </ExerciseInfo>
                  </ExerciseItem>
                ))}
              </ExercisesList>
            </TrainingCard>
          ))
        )}
      </List>
    </Container>
  )
}

export default History

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
  align-items: center;
  margin-bottom: 32px;
  position: relative;
`

const BackButton = styled.button`
  background: transparent;
  color: var(--primary-color);
  font-size: 1rem;
  padding: 8px 0;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const EmptyState = styled.div`
  text-align: center;
  color: var(--text-muted);
  margin-top: 64px;
`

const TrainingCard = styled.div`
  background: var(--surface-color);
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #333;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #333;
`

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DeleteButton = styled.button`
  background: rgba(255, 51, 102, 0.1);
  color: var(--secondary-color);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 51, 102, 0.2);
  }

  &:active {
    transform: scale(0.9);
  }
`

const DateLabel = styled.div`
  font-weight: 700;
  color: var(--text-color);
`

const DurationLabel = styled.div`
  font-family: var(--font-mono);
  color: var(--primary-color);
  font-weight: 700;
`

const ExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ExerciseItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #222;
  &:last-child {
    border-bottom: none;
  }
`

const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ExerciseName = styled.div`
  font-weight: 600;
  font-size: 1rem;
`

const ExerciseMeta = styled.div`
  font-size: 0.8125rem;
  color: var(--text-muted);
`
