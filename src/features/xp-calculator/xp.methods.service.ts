import { XpMethod } from "./xp.methods.types";

export function calculateActionsNeeded(
  xpNeeded: number,
  xpPerAction: number,
): number {
  if (xpNeeded <= 0) return 0;
  return Math.ceil(xpNeeded / xpPerAction);
}

export function calculateXpPerHour(
  xpPerAction: number,
  actionsPerHour: number,
): number {
  return xpPerAction * actionsPerHour;
}
