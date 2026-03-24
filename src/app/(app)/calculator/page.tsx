"use client";

import { useEffect, useState } from "react";
import {
  getXpBetweenLevels,
  getXpFromCurrentXp,
  getXpProgressToTarget,
} from "@/features/xp-calculator/xp.service";
import { Level } from "@/features/xp-calculator/xp.types";
import { SKILLS, Skill } from "@/features/xp-calculator/xp.skills";
import { usePlayerLookup } from "@/features/xp-calculator/usePlayerLookup";
import { MAX_LEVEL } from "@/features/xp-calculator/xp.constants";
import { MethodsTable } from "@/features/xp-calculator/components/MethodsTable";

export default function CalculatorPage() {
  // -----------------------------
  // Player lookup
  // -----------------------------
  const { username, setUsername, player, loading, error, lookup } =
    usePlayerLookup();

  // -----------------------------
  // State
  // -----------------------------
  const [selectedSkill, setSelectedSkill] = useState<Skill>("attack");

  const [currentLevel, setCurrentLevel] = useState<Level>(1);
  const [targetLevel, setTargetLevel] = useState<Level>(2);

  const [xpNeeded, setXpNeeded] = useState<number | null>(null);

  const [progress, setProgress] = useState<{
    current: number;
    required: number;
    progress: number;
  } | null>(null);

  // -----------------------------
  // Sync player → calculator
  // -----------------------------
  useEffect(() => {
    if (!player) return;

    const skillData = player.skills[selectedSkill];
    if (!skillData) return;

    const lvl = skillData.level;
    const xp = skillData.xp;

    setCurrentLevel(lvl as Level);

    // target = current + 1 (safe)
    setTargetLevel(() => {
      const next = lvl + 1;
      return next > MAX_LEVEL ? MAX_LEVEL : (next as Level);
    });

    // opcional: já calcula progresso inicial aqui (UX melhor)
    setProgress(getXpProgressToTarget(xp, lvl as Level, (lvl + 1) as Level));
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

      if (player) {
        const playerXp = player.skills[selectedSkill].xp;

        // cálculo REAL baseado no XP atual
        xp = getXpFromCurrentXp(playerXp, targetLevel);

        setProgress(getXpProgressToTarget(playerXp, currentLevel, targetLevel));
      } else {
        // fallback sem player
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
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">XP Calculator</h1>
        <p className="text-muted-foreground">
          Calculate XP, progress and training efficiency
        </p>
      </div>

      {/* Grid principal */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
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
                onChange={(e) =>
                  setCurrentLevel(Number(e.target.value) as Level)
                }
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
                onChange={(e) =>
                  setTargetLevel(Number(e.target.value) as Level)
                }
                className="w-full rounded-md border bg-background px-3 py-2"
              />
            </div>
          </div>

          {/* Progress */}
          {progress && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{progress.current.toLocaleString()} XP</span>
                <span>{progress.required.toLocaleString()} XP</span>
              </div>

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
              <p className="text-xl font-semibold">
                {xpNeeded.toLocaleString()} XP needed
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Enter valid levels
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Training Methods</h2>

          <MethodsTable skill={selectedSkill} xpNeeded={xpNeeded} />
        </div>
      </div>
    </main>
  );
}
