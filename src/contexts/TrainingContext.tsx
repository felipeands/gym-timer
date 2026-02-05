import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { Training, TrainingScreen } from '../types/training'
import { Exercise } from '../types/exercise'
import { Cycle } from '../types/cycle'
import { DEFAULT_TRAINING } from './../constants/training'
import { DEFAULT_EXERCISE } from './../constants/exercise'
import { DEFAULT_CYCLE } from './../constants/cycle'

type TrainingContextProviderProps = {
  children: ReactNode
}

type TrainingContextData = {
  currentScreen: TrainingScreen
  training: Training
  exercise: Exercise
  cycle: Cycle
  history: Training[]

  setCurrentScreen: (data: TrainingScreen) => void
  newTraining: () => void
  newExercise: (data: Exercise) => void
  endExercise: (data?: Exercise) => void
  newCycle: (data: Cycle) => void
  endCycle: () => void
  endTraining: (finalExercise?: Exercise) => void
  deleteTraining: (startDate?: Date) => void

  getTotalExercises: (data: Training) => number
  getExerciseTotalCycles: (data: Exercise) => number
  newCyclePause: () => void
  startCycle: () => void
}

const TrainingContext = createContext<TrainingContextData>({} as TrainingContextData)

const STORAGE_KEY = '@gym-timer:history'

const TrainingContextProvider = ({ children }: TrainingContextProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<TrainingScreen>('NewTraining')

  const [training, setTraining] = useState<Training>(DEFAULT_TRAINING)
  const [exercise, setExercise] = useState<Exercise>(DEFAULT_EXERCISE)
  const [cycle, setCycle] = useState<Cycle>(DEFAULT_CYCLE)

  const [history, setHistory] = useState<Training[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // Convert ISO strings back to Date objects
        return parsed.map((t: any) => ({
          ...t,
          startAt: t.startAt ? new Date(t.startAt) : undefined,
          endAt: t.endAt ? new Date(t.endAt) : undefined,
          exercises: (t.exercises || t.execises || []).map((e: any) => ({
            ...e,
            startAt: e.startAt ? new Date(e.startAt) : undefined,
            endAt: e.endAt ? new Date(e.endAt) : undefined,
            cycles: e.cycles.map((c: any) => ({
              ...c,
              startAt: c.startAt ? new Date(c.startAt) : undefined,
              pauseAt: c.pauseAt ? new Date(c.pauseAt) : undefined,
              endAt: c.endAt ? new Date(c.endAt) : undefined,
            }))
          }))
        }))
      } catch (e) {
        console.error('Failed to parse history', e)
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const newTraining = () => {
    setTraining(DEFAULT_TRAINING)
  }

  const newCycle = (cycle: Cycle) => {
    setCycle(cycle)
  }

  const newExercise = (exercise: Exercise) => {
    setExercise(exercise)
  }

  const endExercise = (favExercise?: Exercise) => {
    setTraining((curr) => ({
      ...curr,
      exercises: [...curr.exercises, {
        ...(favExercise || exercise),
        endAt: new Date()
      }]
    }))
  }

  const newCyclePause = () => {
    setCycle((curr) => ({
      ...curr,
      pauseAt: new Date()
    }))
  }

  const startCycle = () => {
    const now = new Date()
    setCycle((curr) => ({
      ...curr,
      startAt: now
    }))
    setExercise((curr) => {
      if (!curr.startAt) {
        return { ...curr, startAt: now }
      }
      return curr
    })
    setTraining((curr) => {
      if (!curr.startAt) {
        return { ...curr, startAt: now }
      }
      return curr
    })
  }

  const endCycle = () => {
    const endAt = new Date();
    const cycleUpdated = { ...cycle, endAt };

    setCycle(cycleUpdated);
    setExercise(prevEx => ({
      ...prevEx,
      cycles: [...prevEx.cycles, cycleUpdated]
    }));
  }

  const endTraining = (finalExercise?: Exercise) => {
    const endAt = new Date();

    // Use current state to build final training object
    const currentActiveExercise = finalExercise || exercise;
    const exercises = [...training.exercises];

    if (currentActiveExercise.cycles.length > 0) {
      const alreadyAdded = exercises.some(e =>
        e.startAt?.getTime() === currentActiveExercise.startAt?.getTime() &&
        e.name === currentActiveExercise.name
      );

      if (!alreadyAdded) {
        exercises.push({
          ...currentActiveExercise,
          endAt: currentActiveExercise.endAt || endAt
        });
      }
    }

    const finalTraining: Training = {
      ...training,
      exercises,
      endAt
    }

    setTraining(finalTraining)

    setHistory(prev => {
      // Robust check to avoid duplication in history
      const alreadyInHistory = prev.some(t =>
        t.startAt?.getTime() === finalTraining.startAt?.getTime()
      );

      if (alreadyInHistory) return prev;
      return [finalTraining, ...prev];
    })

    setCurrentScreen('EndTraining')
  }

  // get data
  const getTotalExercises = (training: Training) => {
    const total = training.exercises.length
    // If we are on Running screen, the current exercise is not in the list yet
    return (currentScreen === 'Running' || currentScreen === 'EndCycle') ? total + 1 : total
  }

  const getExerciseTotalCycles = (exercise: Exercise) => {
    const total = exercise.cycles.length
    // If the current cycle is not ended yet, it's the +1
    return cycle.endAt ? total : total + 1
  }

  const deleteTraining = (startDate?: Date) => {
    if (!startDate) return
    setHistory(prev => prev.filter(t => t.startAt?.getTime() !== startDate.getTime()))
  }

  return (
    <TrainingContext.Provider value={{
      currentScreen,
      training,
      exercise,
      cycle,
      history,

      setCurrentScreen,
      newTraining,
      newExercise,
      endExercise,
      newCycle,
      endCycle,
      endTraining,
      deleteTraining,

      getTotalExercises,
      getExerciseTotalCycles,
      newCyclePause,
      startCycle
    }}>
      {children}
    </TrainingContext.Provider>
  )
}

const useTrainingContext = (): TrainingContextData => {
  const context = useContext(TrainingContext)
  if (!context) {
    throw new Error(`useTrainingContext must be used within a TrainingContextProvider`)
  }
  return context
}

export { TrainingContextProvider, useTrainingContext }
