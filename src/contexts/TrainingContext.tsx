import { ReactNode, createContext, useContext, useState } from 'react'
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

  setCurrentScreen: (data: TrainingScreen) => void
  newTraining: () => void
  newExercise: (data: Exercise) => void
  newCycle: (data: Cycle) => void

  getTotalExercises: (data: Training) => number
  getExerciseTotalCycles: (data: Exercise) => number
  newCyclePause: () => void
}

const TrainingContext = createContext<TrainingContextData>({} as TrainingContextData)

const TrainingContextProvider = ({ children }: TrainingContextProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<TrainingScreen>('NewTraining')
  const [training, setTraining] = useState<Training>(DEFAULT_TRAINING)
  const [exercise, setExercise] = useState<Exercise>(DEFAULT_EXERCISE)
  const [cycle, setCycle] = useState<Cycle>(DEFAULT_CYCLE)

  const newTraining = () => {
    setTraining(DEFAULT_TRAINING)
  }

  const newCycle = (cyle: Cycle) => {
    setCurrentScreen('Running')
  }

  const newExercise = (exercise: Exercise) => {
    setExercise(exercise)
    setCurrentScreen('Running')
  }

  const endExercise = () => {
  }

  const newCyclePause = () => {
    setCycle((curr) => ({
      ...curr,
      pauseAt: new Date()
    }))
    setCurrentScreen('EndCycle')
  }

  const endCyle = () => {
    setCurrentScreen('EndCycle')
  }

  const endTraining = () => {
    setCurrentScreen('EndTraining')
  }

  // get data
  const getTotalExercises = (training: Training) => {
    const total = training.execises.length
    return cycle.endAt ? total : total + 1
  }

  const getExerciseTotalCycles = (exercise: Exercise) => {
    const total = exercise.cycles.length
    return cycle.endAt ? total : total + 1
  }

  return (
    <TrainingContext.Provider value={{
        currentScreen,
        training,
        exercise,
        cycle,

        setCurrentScreen,
        newTraining,
        newExercise,
        newCycle,

        getTotalExercises,
        getExerciseTotalCycles,
        newCyclePause
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
