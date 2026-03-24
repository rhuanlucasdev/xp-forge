"use client";

import { usePlayerLookup } from "@/features/xp-calculator/usePlayerLookup";

export default function CalculatorPage() {
  const { username, setUsername, player, isLoading, error, lookup } =
    usePlayerLookup();

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">XP Calculator</h1>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          className="flex-1 h-10 px-3 rounded-md border bg-background"
        />

        <button
          onClick={lookup}
          disabled={isLoading}
          className="px-4 rounded-md bg-primary text-primary-foreground"
        >
          {isLoading ? "Loading..." : "Lookup"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* RESULT */}
      {player && (
        <div className="p-4 rounded-md border bg-card">
          <p>Attack Level: {player.skills.attack.level}</p>
          <p>Magic Level: {player.skills.magic.level}</p>
        </div>
      )}
    </div>
  );
}
