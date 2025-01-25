import { Exercise } from "./exercise"

export type TrainingScreen = 'NewTraining' | 'Running' | 'EndCycle' | 'EndTraining'

export type Feeling = 'Fuck' | 'Bad' | 'Neutral' | 'Good' | 'VeryGood'

export type Training = {
  execises: Exercise[]
  comment?: string
  feeling?: Feeling
}