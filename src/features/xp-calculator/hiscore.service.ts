import { SKILLS, Skill } from "./xp.skills";

type SkillData = {
  rank: number;
  level: number;
  xp: number;
};

export type PlayerStats = {
  skills: Record<Skill, SkillData>;
};

export class HiscoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HiscoreError";
  }
}

// -----------------------------
// Parser
// -----------------------------
export function parseHiscore(text: string): PlayerStats {
  const lines = text.trim().split("\n");

  if (lines.length < SKILLS.length) {
    throw new HiscoreError("Invalid hiscore response");
  }

  const skills = {} as Record<Skill, SkillData>;

  SKILLS.forEach((skill, index) => {
    const line = lines[index];

    if (!line) {
      throw new HiscoreError(`Missing data for skill: ${skill}`);
    }

    const [rank, level, xp] = line.split(",").map(Number);

    if (Number.isNaN(rank) || Number.isNaN(level) || Number.isNaN(xp)) {
      throw new HiscoreError(`Invalid data for skill: ${skill}`);
    }

    skills[skill] = {
      rank,
      level,
      xp,
    };
  });

  return { skills };
}

// -----------------------------
// Fetch (via BFF)
// -----------------------------
export async function fetchPlayer(username: string): Promise<PlayerStats> {
  if (!username.trim()) {
    throw new HiscoreError("Username is required");
  }

  try {
    const res = await fetch(
      `/api/player?username=${encodeURIComponent(username)}`,
    );

    const data = await res.json();

    if (!res.ok) {
      throw new HiscoreError(data?.error || "Failed to fetch player");
    }

    const raw = data.raw as string;

    if (!raw) {
      throw new HiscoreError("Invalid API response");
    }

    return parseHiscore(raw);
  } catch (err) {
    throw new HiscoreError(
      err instanceof Error ? err.message : "Unknown error",
    );
  }
}
