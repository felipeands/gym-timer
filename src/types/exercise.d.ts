import { Cycle } from "./cycle"

export type BodyPart = 'ombro' | 'peito' | 'costas' | 'biceps' | 'triceps' | 'trapezio' | 'antebraço' | 'panturrilha' | 'coxa' | 'gluteos'

export type Exercise = {
  bodyPart: BodyPart
  name: string
  cycles: Cycle[]
  startAt?: Date
  endAt?: Date
}

export type NewExerciseProps = {
  bodyPart: BodyPart
  name: string
}