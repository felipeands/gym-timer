import { ReactNode, createContext, useContext, useState } from 'react'
import { TrainingScreen } from '../types/training'

type TrainingContextProviderProps = {
  children: ReactNode
}

type TrainingContextData = {
  currentScreen: TrainingScreen
  setCurrentScreen: (data: TrainingScreen) => void
}

const TrainingContext = createContext<TrainingContextData>({} as TrainingContextData)

const TrainingContextProvider = ({ children }: TrainingContextProviderProps) => {
  const [currentScreen, setCurrentScreen] = useState<TrainingScreen>('NewTraining')

  return (
    <TrainingContext.Provider value={{ currentScreen, setCurrentScreen }}>
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
