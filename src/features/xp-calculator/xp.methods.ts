import { TrainingMethodsMap } from "./xp.methods.types";

export const TRAINING_METHODS: TrainingMethodsMap = {
  attack: [
    {
      id: "hill_giants",
      name: "Hill Giants",
      xp: 35,
      xpPerHour: 14000,
      intensity: "low",
      afk: true,
    },
    {
      id: "cows",
      name: "Cows",
      xp: 8,
      xpPerHour: 7200,
      intensity: "low",
      afk: true,
    },
    {
      id: "chickens",
      name: "Chickens",
      xp: 4,
      xpPerHour: 4800,
      intensity: "low",
      afk: true,
    },
  ],
};
