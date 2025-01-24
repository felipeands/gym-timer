import { ReactNode, createContext, useContext, useState } from 'react'
import { Training, TrainingScreen } from '../types/training'
import { Exercise } from '../types/exercise'

type TrainingContextProviderProps = {
  children: ReactNode
}

type TrainingContextData = {
  currentScreen: TrainingScreen
  training: Training | null
  setCurrentScreen: (data: TrainingScreen) => void
  newTraining: (data: Training) => void
  getLastExercise: (data: Training) => Exercise | null
  getTotalExercises: (data: Training) => number
}

const TrainingContext = createContext<TrainingContextData>({} as TrainingContextData)

const TrainingContextProvider = ({ children }: TrainingContextProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<TrainingScreen>('NewTraining')
  const [training, setTrainig] = useState<Training | null>(null)

  const newTraining = (data: Training) => {
    setTrainig(data)
    setCurrentScreen('Running')
  }

  const newCycle = () => {

  }

  const newExercise = () => {

  }

  const endExercise = () => {

  }

  const newCycleInterval = () => {

  }

  const endCyle = () => {

  }

  const endTraining = () => {

  }

  // get data
  const getLastExercise = (training: Training) => {
    if (!training) {
      return null
    }
    const lastExercise = training.execises[training.execises.length - 1]
    if (!lastExercise) {
      return null
    }
    return lastExercise
  }

  const getTotalExercises = (training: Training) => {
    if (!training) {
      return 0
    }
    return training.execises.length
  }

  return (
    <TrainingContext.Provider value={{ currentScreen, training, setCurrentScreen, newTraining, getLastExercise, getTotalExercises }}>
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
