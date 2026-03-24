"use client";

import { useEffect, useState } from "react";
import {
  getXpBetweenLevels,
  getXpFromCurrentXp,
  getXpProgressInLevel,
  getXpProgressToTarget,
} from "@/features/xp-calculator/xp.service";
import { Level } from "@/features/xp-calculator/xp.types";
import { SKILLS, Skill } from "@/features/xp-calculator/xp.skills";
import { usePlayerLookup } from "@/features/xp-calculator/usePlayerLookup";
import { MAX_LEVEL } from "@/features/xp-calculator/xp.constants";

export default function CalculatorPage() {
  const { username, setUsername, player, loading, error, lookup } =
    usePlayerLookup();

  const [selectedSkill, setSelectedSkill] = useState<Skill>("attack");

  const [currentLevel, setCurrentLevel] = useState<Level>(1);
  const [targetLevel, setTargetLevel] = useState<Level>(2);

  const [xpNeeded, setXpNeeded] = useState<number | null>(null);

  // 🔥 NOVO
  const [progress, setProgress] = useState<{
    current: number;
    required: number;
    progress: number;
  } | null>(null);

  // -----------------------------
  // Sync player
  // -----------------------------
  useEffect(() => {
    if (!player) return;

    const skillData = player.skills[selectedSkill];
    if (!skillData) return;

    const lvl = skillData.level;

    setCurrentLevel(lvl as Level);

    setTargetLevel(() => {
      const next = lvl + 1;
      return next > MAX_LEVEL ? MAX_LEVEL : (next as Level);
    });
  }, [player, selectedSkill]);

  // -----------------------------
  // Calculate XP + Progress
  // -----------------------------
  useEffect(() => {
    try {
      if (targetLevel <= currentLevel) {
        setXpNeeded(null);
        setProgress(null);
        return;
      }

      let xp: number;

      if (player && selectedSkill) {
        const playerXp = player.skills[selectedSkill].xp;

        xp = getXpFromCurrentXp(playerXp, targetLevel);

        // 🔥 progresso REAL
        setProgress(getXpProgressToTarget(playerXp, currentLevel, targetLevel));
      } else {
        xp = getXpBetweenLevels(currentLevel, targetLevel);
        setProgress(null);
      }

      setXpNeeded(xp);
    } catch {
      setXpNeeded(null);
      setProgress(null);
    }
  }, [currentLevel, targetLevel, player, selectedSkill]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <main className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-lg">
        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold">XP Calculator</h1>
          <p className="text-sm text-muted-foreground">
            Calculate XP between levels
          </p>
        </div>

        {/* Player */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Player</label>

          <div className="flex gap-2">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="flex-1 rounded-md border bg-background px-3 py-2"
            />

            <button
              onClick={lookup}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
              {loading ? "..." : "Lookup"}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Skill */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Skill</label>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value as Skill)}
            className="w-full rounded-md border bg-background px-3 py-2"
          >
            {SKILLS.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        {/* Levels */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Current level</label>
            <input
              type="number"
              min={1}
              max={120}
              value={currentLevel}
              onChange={(e) => setCurrentLevel(Number(e.target.value) as Level)}
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Target level</label>
            <input
              type="number"
              min={1}
              max={120}
              value={targetLevel}
              onChange={(e) => setTargetLevel(Number(e.target.value) as Level)}
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </div>
        </div>

        {/* 🔥 PROGRESS SECTION */}
        {progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress.current.toLocaleString()} XP</span>
              <span>{progress.required.toLocaleString()} XP</span>
            </div>

            {/* Progress bar */}
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress.progress * 100}%` }}
              />
            </div>

            <p className="text-center text-xs text-muted-foreground">
              {(progress.progress * 100).toFixed(2)}% to next level
            </p>
          </div>
        )}

        {/* Result */}
        <div className="rounded-lg bg-muted p-4 text-center">
          {xpNeeded !== null ? (
            <p className="text-lg font-semibold">
              {xpNeeded.toLocaleString()} XP needed
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Enter valid levels</p>
          )}
        </div>
      </div>
    </main>
  );
}
