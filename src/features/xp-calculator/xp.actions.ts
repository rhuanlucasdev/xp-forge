import { XpMethod } from "./xp.methods.types";

export function calculateActionsNeeded(
  xpNeeded: number,
  method: XpMethod,
): number {
  return Math.ceil(xpNeeded / method.xp);
}
