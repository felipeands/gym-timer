import { BodyPart, Exercise } from "../types/exercise";

export const bodyParts: BodyPart[] = ['ombro', 'peito', 'costas', 'biceps', 'triceps', 'trapezio', 'antebraço', 'panturrilha', 'coxa', 'gluteos']

export const exercisesByBodyPart: Record<BodyPart, string[]> = {
  'ombro': ['Desenvolvimento Halter', 'Desenvolvimento Barra', 'Elevação Lateral', 'Elevação Frontal', 'Crucifixo Inverso', 'Desenvolvimento Máquina'],
  'peito': ['Supino Reto Barra', 'Supino Reto Halter', 'Supino Inclinado Barra', 'Supino Inclinado Halter', 'Peck Deck', 'Crossover', 'Flexão de Braço', 'Supino Declinado'],
  'costas': ['Puxada Alta', 'Remada Baixa', 'Remada Curvada', 'PullDown', 'Barra Fixa', 'Remada Cavalinho', 'Levantamento Terra'],
  'biceps': ['Rosca Direta', 'Rosca Martelo', 'Rosca Scott', 'Rosca Concentrada', 'Rosca Alternada', 'Rosca W'],
  'triceps': ['Tríceps Pulley', 'Tríceps Corda', 'Tríceps Testa', 'Mergulho Banco', 'Extensão Unilateral', 'Tríceps Francês'],
  'trapezio': ['Encolhimento Halter', 'Encolhimento Barra', 'Remada Alta'],
  'antebraço': ['Rosca Inversa', 'Rosca Punho'],
  'panturrilha': ['Gêmeos em pé', 'Gêmeos sentado (Burrinho)', 'Panturrilha Leg Press'],
  'coxa': ['Agachamento Livre', 'Leg Press 45', 'Cadeira Extensora', 'Mesa Flexora', 'Cadeira Adutora', 'Cadeira Abdutora', 'Agachamento Hack', 'Afundo/Passada'],
  'gluteos': ['Elevação Pélvica', 'Glúteo Cabo', 'Stiff', 'Glúteo Máquina']
}

export const DEFAULT_EXERCISE: Exercise = {
  bodyPart: bodyParts[0],
  name: '',
  cycles: []
}