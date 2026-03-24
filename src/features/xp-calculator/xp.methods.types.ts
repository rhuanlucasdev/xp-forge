import { Skill } from "./xp.skills";

export type XpMethod = {
  id: string;
  name: string;
  xp: number;
  xpPerHour: number;
  intensity: "low" | "medium" | "high";
  afk: boolean;
};

// 🔥 AQUI É O PONTO CHAVE
export type TrainingMethodsMap = Partial<Record<Skill, readonly XpMethod[]>>;
