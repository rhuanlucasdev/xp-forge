import { XpMethod } from "./xp.methods.types";

export const XP_METHODS: XpMethod[] = [
  {
    id: "chicken",
    skill: "attack",
    name: "Chickens",
    xpPerAction: 4,
    actionsPerHour: 1200,
  },
  {
    id: "cow",
    skill: "attack",
    name: "Cows",
    xpPerAction: 8,
    actionsPerHour: 900,
  },
  {
    id: "hill_giant",
    skill: "attack",
    name: "Hill Giants",
    xpPerAction: 35,
    actionsPerHour: 400,
  },
];
