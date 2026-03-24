"use client";

import { useEffect, useState } from "react";
import { getXpBetweenLevels } from "@/features/xp-calculator/xp.service";
import { Level } from "@/features/xp-calculator/xp.types";
import { SKILLS, Skill } from "@/features/xp-calculator/xp.skills";
import { usePlayerLookup } from "@/features/xp-calculator/usePlayerLookup";

export default function CalculatorPage() {
  // -----------------------------
  // Player lookup
  // -----------------------------
  const { username, setUsername, player, loading, error, lookup } =
    usePlayerLookup();

  // -----------------------------
  // Calculator state
  // -----------------------------
  const [selectedSkill, setSelectedSkill] = useState<Skill>("attack");

  const [currentLevel, setCurrentLevel] = useState<Level>(1);
  const [targetLevel, setTargetLevel] = useState<Level>(2);

  const [xpNeeded, setXpNeeded] = useState<number | null>(null);

  // -----------------------------
  // Sync player → calculator
  // -----------------------------
  useEffect(() => {
    if (!player) return;

    const skillData = player.skills[selectedSkill];
    if (!skillData) return;

    setCurrentLevel(skillData.level as Level);
  }, [player, selectedSkill]);

  // -----------------------------
  // Calculate XP
  // -----------------------------
  useEffect(() => {
    try {
      if (targetLevel <= currentLevel) {
        setXpNeeded(null);
        return;
      }

      const xp = getXpBetweenLevels(currentLevel, targetLevel);

      setXpNeeded(xp);
    } catch {
      setXpNeeded(null);
    }
  }, [currentLevel, targetLevel]);

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

        {/* Player lookup */}
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

          {player && (
            <p className="text-xs text-muted-foreground">
              Loaded {selectedSkill} data
            </p>
          )}
        </div>

        {/* Levels */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Current level</label>
            <input
              type="number"
              min={1}
              max={99}
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
              max={99}
              value={targetLevel}
              onChange={(e) => setTargetLevel(Number(e.target.value) as Level)}
              className="w-full rounded-md border bg-background px-3 py-2"
            />
          </div>
        </div>

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
