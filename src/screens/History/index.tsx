import { useState, useMemo } from "react"
import styled from "styled-components"
import { useTrainingContext } from "../../contexts/TrainingContext"

const History = () => {
  const { history, setCurrentScreen, deleteTraining } = useTrainingContext()
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

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

  const formatDate = (date?: Date) => {
    if (!date) return ""
    const d = date.getDate().toString().padStart(2, '0')
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const y = date.getFullYear().toString().slice(-2)
    return `${d}/${m}/${y}`
  }

  const getWeekday = (date?: Date) => {
    if (!date) return ""
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date)
  }

  const groupedHistory = useMemo(() => {
    const groups: Record<string, typeof history> = {}
    history.forEach(t => {
      const dateKey = formatDate(t.startAt)
      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push(t)
    })
    return groups
  }, [history])

  const toggleGroup = (date: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [date]: !prev[date]
    }))
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
          Object.entries(groupedHistory).map(([date, sessions]) => (
            <DateGroup key={date}>
              <DateHeader onClick={() => toggleGroup(date)}>
                <DateTitle>
                  <ToggleIcon isExpanded={expandedGroups[date]}>
                    ▼
                  </ToggleIcon>
                  <DateInfo>
                    <DateText>{date}</DateText>
                    <WeekdayText>{getWeekday(sessions[0]?.startAt)}</WeekdayText>
                  </DateInfo>
                </DateTitle>
                <SessionsCount>{sessions.length} {sessions.length === 1 ? 'treino' : 'treinos'}</SessionsCount>
              </DateHeader>

              {expandedGroups[date] && (
                <GroupContent>
                  {sessions.map((training, index) => (
                    <TrainingCard key={index}>
                      <CardHeader>
                        <InfoGroup>
                          <TimeLabel>{training.startAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TimeLabel>
                          <DurationLabel>{formatTime(getDuration(training.startAt, training.endAt))}</DurationLabel>
                        </InfoGroup>
                        <DeleteButton onClick={(e) => { e.stopPropagation(); handleDelete(training); }} title="Excluir treino">×</DeleteButton>
                      </CardHeader>
                      <ExercisesList>
                        {(training.exercises || []).map((ex, i) => (
                          <ExerciseItem key={i}>
                            <ExerciseInfo>
                              <ExerciseName>{ex.name}</ExerciseName>
                              <ExerciseMeta>{ex.cycles.length} {ex.cycles.length === 1 ? 'série' : 'séries'} • {formatTime(getDuration(ex.startAt, ex.endAt))}</ExerciseMeta>
                            </ExerciseInfo>
                          </ExerciseItem>
                        ))}
                      </ExercisesList>
                    </TrainingCard>
                  ))}
                </GroupContent>
              )}
            </DateGroup>
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

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const DateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 4px;
  cursor: pointer;
  user-select: none;
  border-bottom: 2px solid #333;
  margin-top: 8px;
`

const DateTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-color);
`

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const DateText = styled.span`
  line-height: 1.1;
`

const WeekdayText = styled.span`
  font-size: 0.7rem;
  font-weight: 400;
  color: var(--text-muted);
  text-transform: capitalize;
  margin-top: 2px;
`

const ToggleIcon = styled.span<{ isExpanded?: boolean }>`
  font-size: 0.8rem;
  transition: transform 0.2s ease;
  transform: rotate(${props => props.isExpanded ? '0deg' : '-90deg'});
  color: var(--primary-color);
`

const SessionsCount = styled.div`
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
`

const GroupContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 4px;
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

const TimeLabel = styled.div`
  font-weight: 700;
  color: var(--text-color);
  font-size: 0.9rem;
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
