import { Level, XP } from "./xp.types";

export const MIN_LEVEL: Level = 1;
export const MAX_LEVEL: Level = 99;

function generateXpTable(): XP[] {
  const table: XP[] = [0, 0]; // index 0 ignorado, level 1 = 0 XP
  let points = 0;

  for (let level = 2; level <= MAX_LEVEL; level++) {
    points += Math.floor(level - 1 + 300 * Math.pow(2, (level - 1) / 7));
    table[level] = Math.floor(points / 4);
  }

  return table;
}

export const XP_TABLE: ReadonlyArray<XP> = Object.freeze(generateXpTable());
