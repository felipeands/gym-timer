import styled from "styled-components"
import { useTrainingContext } from "../../contexts/TrainingContext"
import { useMemo } from "react"

const Recovery = () => {
    const { recoverTraining, discardRecovery } = useTrainingContext()

    const savedState = useMemo(() => {
        const stored = localStorage.getItem('@gym-timer:active-state')
        if (!stored) return null
        try {
            const parsed = JSON.parse(stored)
            return parsed
        } catch (e) {
            return null
        }
    }, [])

    const formatDuration = (startAt?: string) => {
        if (!startAt) return '--:--'
        const start = new Date(startAt)
        const now = new Date()
        const diff = Math.floor((now.getTime() - start.getTime()) / 1000)
        const minutes = Math.floor(diff / 60)
        const seconds = diff % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    if (!savedState) {
        return (
            <Container>
                <MainContent>
                    <ScrollContent>
                        <Title>Nenhum treino encontrado</Title>
                        <SecondaryButton onClick={discardRecovery}>Voltar</SecondaryButton>
                    </ScrollContent>
                </MainContent>
            </Container>
        )
    }

    const { training, exercise } = savedState

    return (
        <Container>
            <MainContent>
                <ScrollContent>
                    <Title>Treino em Andamento</Title>
                    <Subtitle>Deseja continuar de onde parou?</Subtitle>

                    <SummaryCard>
                        <SummaryHeader>
                            <MuscleBadge>{exercise?.bodyPart || 'Exercício'}</MuscleBadge>
                            <Duration>{formatDuration(training?.startAt)}</Duration>
                        </SummaryHeader>
                        <ExerciseName>{exercise?.name || 'Sem nome'}</ExerciseName>
                        <ProgressInfo>
                            Séries concluídas: <strong>{exercise?.cycles?.length || 0}</strong>
                        </ProgressInfo>
                    </SummaryCard>

                    <ActionArea>
                        <PrimaryButton onClick={recoverTraining}>
                            Continuar de onde parei
                        </PrimaryButton>

                        <SecondaryButton onClick={discardRecovery}>
                            Começar novo treino
                        </SecondaryButton>
                    </ActionArea>
                </ScrollContent>
            </MainContent>
        </Container>
    )
}

export default Recovery

const SummaryCard = styled.div`
    background: var(--surface-color);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 24px;
    width: 100%;
    max-width: 320px;
    text-align: left;
    margin-bottom: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`

const SummaryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`

const MuscleBadge = styled.span`
    background: rgba(0, 255, 136, 0.1);
    color: #00FF88;
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const Duration = styled.span`
    color: var(--text-muted);
    font-size: 0.875rem;
    font-weight: 500;
`

const ExerciseName = styled.h2`
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: var(--text-color);
`

const ProgressInfo = styled.p`
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0;

    strong {
        color: var(--text-color);
    }
`

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  line-height: 1.1;
`

const Subtitle = styled.p`
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0 0 40px 0;
  line-height: 1.5;
  max-width: 300px;
`

const ActionArea = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 24px;
    background: linear-gradient(to top, var(--bg-color) 80%, transparent);
    z-index: 10;
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
  font-family: var(--font-main);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  display: block;
  
  &:not(:disabled):hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:active:not(:disabled) {
    transform: scale(0.98) translateY(0);
  }
`

const SecondaryButton = styled.button`
  background: transparent;
  color: var(--primary-color);
  font-weight: 600;
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:active {
    opacity: 0.7;
  }
`
