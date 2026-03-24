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

    skills[skill] = {
      rank,
      level,
      xp,
    };
  });

  return { skills };
}

// -----------------------------
// Fetch
// -----------------------------
export async function fetchPlayer(username: string): Promise<PlayerStats> {
  if (!username.trim()) {
    throw new HiscoreError("Username is required");
  }

  const res = await fetch(
    `/api/hiscore?username=${encodeURIComponent(username)}`,
  );

  if (!res.ok) {
    throw new HiscoreError("Player not found");
  }

  const text = await res.text();

  return parseHiscore(text);
}
