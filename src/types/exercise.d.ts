import { Cycle } from "./cycle"

export type BodyPart = 'ombro' | 'peito' | 'costas' | 'biceps' | 'triceps' | 'trapezio' | 'antebraco' | 'panturrilha' | 'coxa' | 'gluteos'

export type Exercise = {
  bodyPart: BodyPart
  name: string
  cycles: Cycle[]
}