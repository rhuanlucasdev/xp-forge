import { Level, XP, XpProgress } from "./xp.types";
import { XP_TABLE, MIN_LEVEL, MAX_LEVEL, MAX_XP } from "./xp.constants";

export class XpServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "XpServiceError";
  }
}

// -----------------------------
// Helpers
// -----------------------------

function assertValidLevel(
  level: number,
  label: string,
): asserts level is Level {
  if (level < MIN_LEVEL || level > MAX_LEVEL) {
    throw new XpServiceError(
      `${label} must be between ${MIN_LEVEL} and ${MAX_LEVEL}`,
    );
  }
}

export function getXpForLevel(level: Level): XP {
  return XP_TABLE[level];
}

// -----------------------------
// Core functions
// -----------------------------

export function getXpBetweenLevels(
  currentLevel: Level,
  targetLevel: Level,
): XP {
  assertValidLevel(currentLevel, "Current level");
  assertValidLevel(targetLevel, "Target level");

  if (targetLevel <= currentLevel) {
    throw new XpServiceError("Target level must be greater than current level");
  }

  return getXpForLevel(targetLevel) - getXpForLevel(currentLevel);
}

export function getCurrentLevelFromXp(totalXp: XP): Level {
  if (totalXp < 0) {
    throw new XpServiceError("XP cannot be negative");
  }

  if (totalXp < 0 || totalXp > MAX_XP) {
    throw new XpServiceError("XP out of bounds");
  }

  for (let level = MAX_LEVEL; level >= MIN_LEVEL; level--) {
    if (totalXp >= XP_TABLE[level]) {
      return level;
    }
  }

  return MIN_LEVEL;
}

export function getXpToNextLevel(currentLevel: Level, totalXp: XP): XP {
  assertValidLevel(currentLevel, "Current level");

  if (totalXp < 0) {
    throw new XpServiceError("XP cannot be negative");
  }

  if (currentLevel >= MAX_LEVEL) {
    return 0;
  }

  const nextLevel = currentLevel + 1;
  const nextLevelXp = getXpForLevel(nextLevel);

  return Math.max(0, nextLevelXp - totalXp);
}

export function getXpProgressInLevel(totalXp: XP): XpProgress {
  if (totalXp < 0) {
    throw new XpServiceError("XP cannot be negative");
  }

  const currentLevel = getCurrentLevelFromXp(totalXp);

  if (currentLevel >= MAX_LEVEL) {
    return {
      current: 0,
      required: 0,
      progress: 1,
    };
  }

  const nextLevel = currentLevel + 1;

  const levelStartXp = getXpForLevel(currentLevel);
  const levelEndXp = getXpForLevel(nextLevel);

  const current = totalXp - levelStartXp;
  const required = levelEndXp - levelStartXp;

  const progress = Math.min(Math.max(current / required, 0), 1);

  return {
    current,
    required,
    progress,
  };
}
