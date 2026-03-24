import { useState } from "react";
import {
  getXpBetweenLevels,
  getXpProgressInLevel,
  getXpForLevel,
} from "./xp.service";
import { Level } from "./xp.types";

const MIN_LEVEL: Level = 1;
const MAX_LEVEL: Level = 99;

export function useXpCalculator() {
  const [username, setUsername] = useState("");
  const [currentLevel, setCurrentLevel] = useState<Level>(1);
  const [targetLevel, setTargetLevel] = useState<Level>(2);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Validation
  // -----------------------------

  const isInvalid = targetLevel <= currentLevel;

  // -----------------------------
  // Derived data (SAFE)
  // -----------------------------

  let xpNeeded: number | null = null;

  if (!isInvalid) {
    xpNeeded = getXpBetweenLevels(currentLevel, targetLevel);
  }

  const totalXp = getXpForLevel(currentLevel);
  const progress = getXpProgressInLevel(totalXp);

  // -----------------------------
  // Helpers
  // -----------------------------

  function sanitize(value: string): Level {
    const num = Number(value);

    if (isNaN(num)) return MIN_LEVEL;

    return Math.min(Math.max(num, MIN_LEVEL), MAX_LEVEL) as Level;
  }

  // -----------------------------
  // Actions
  // -----------------------------

  async function lookupPlayer() {
    if (!username) return;

    setLoading(true);

    // FUTURO: API real aqui
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
  }

  // -----------------------------
  // API do hook
  // -----------------------------

  return {
    // state
    username,
    currentLevel,
    targetLevel,
    loading,

    // setters
    setUsername,
    setCurrentLevel,
    setTargetLevel,

    // helpers
    sanitize,

    // derived
    isInvalid,
    xpNeeded,
    progress,

    // actions
    lookupPlayer,
  };
}
