import { BodyPart, Exercise } from "../types/exercise";

export const bodyParts: BodyPart[] = ['ombro' , 'peito' , 'costas' , 'biceps' , 'triceps' , 'trapezio' , 'antebraço' , 'panturrilha' , 'coxa' , 'gluteos']

export const DEFAULT_EXERCISE: Exercise = {
  bodyPart: bodyParts[0],
  name: '',
  cycles: []
}