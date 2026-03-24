import { Skill } from "./xp.skills";

export type XpMethod = {
  id: string;
  skill: Skill;

  name: string;
  xpPerAction: number;

  // futuro
  icon?: string;
};
