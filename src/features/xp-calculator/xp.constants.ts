import { Level } from "./xp.types";

export const MIN_LEVEL: Level = 1;
export const MAX_LEVEL: Level = 120;
export const MAX_XP = 200_000_000;

function generateXpTable(): number[] {
  const table: number[] = [];
  let points = 0;

  table[1] = 0;

  for (let level = 2; level <= MAX_LEVEL; level++) {
    points += Math.floor(level - 1 + 300 * Math.pow(2, (level - 1) / 7));

    table[level] = Math.floor(points / 4);
  }

  return table;
}

export const XP_TABLE = generateXpTable();
