// Representa um nivel no sistema (validado em runtime no service)
export type Level = number;

//  Representa a quantidade de experiencia (Xp)
export type XP = number;

// Estrutura para progresso dentro de um level
export interface XpProgress {
  current: XP; // XP acumulada no level atual
  required: XP; // XP total necessária para subir para o próximo level
  progress: number; // Progresso percentual (0 a 1) dentro do level atual
}
