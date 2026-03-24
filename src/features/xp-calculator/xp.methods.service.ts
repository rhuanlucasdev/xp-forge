import { XpMethod } from "./xp.methods.types";

export function calculateActionsNeeded(
  xpNeeded: number,
  method: XpMethod,
): number {
  if (xpNeeded <= 0) return 0;
  if (!method.xp || method.xp <= 0) return 0;

  return Math.ceil(xpNeeded / method.xp);
}

export function calculateXpPerHour(
  xpPerAction: number,
  actionsPerHour: number,
): number {
  return xpPerAction * actionsPerHour;
}
