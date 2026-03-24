import { XpMethod } from "./xp.methods.types";

export function calculateActionsNeeded(
  xpNeeded: number,
  method: XpMethod,
): number {
  if (xpNeeded <= 0) return 0;

  return Math.ceil(xpNeeded / method.xpPerAction);
}
