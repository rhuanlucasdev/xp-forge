"use client";

import { useState } from "react";
import { fetchPlayer, PlayerStats } from "./hiscore.service";

export function usePlayerLookup() {
  const [username, setUsername] = useState("");
  const [player, setPlayer] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup() {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchPlayer(username);

      setPlayer(data);
    } catch (err) {
      console.error("LOOKUP ERROR:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setPlayer(null);
    } finally {
      setLoading(false);
    }
  }

  return {
    username,
    setUsername,
    player,
    loading,
    error,
    lookup,
  };
}
