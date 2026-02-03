import { Exercise } from "./exercise"

export type TrainingScreen = 'NewTraining' | 'Running' | 'EndCycle' | 'EndTraining' | 'History'

export type Feeling = 'Fuck' | 'Bad' | 'Neutral' | 'Good' | 'VeryGood'

export type Training = {
  exercises: Exercise[]
  startAt?: Date
  endAt?: Date
  comment?: string
  feeling?: Feeling
}