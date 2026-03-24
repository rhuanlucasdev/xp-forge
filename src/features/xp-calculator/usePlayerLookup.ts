"use client";

import { useState } from "react";
import { fetchPlayer, PlayerStats } from "./hiscore.service";

type UsePlayerLookupReturn = {
  username: string;
  setUsername: (value: string) => void;

  player: PlayerStats | null;
  isLoading: boolean;
  error: string | null;

  lookup: () => Promise<void>;
};

export function usePlayerLookup(): UsePlayerLookupReturn {
  const [username, setUsername] = useState("");
  const [player, setPlayer] = useState<PlayerStats | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookup() {
    if (!username.trim()) {
      setError("Enter a username");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchPlayer(username);

      setPlayer(data);
    } catch (err) {
      console.error("LOOKUP ERROR:", err);
      setError("Player not found or API error");
      setPlayer(null);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    username,
    setUsername,
    player,
    isLoading,
    error,
    lookup,
  };
}
