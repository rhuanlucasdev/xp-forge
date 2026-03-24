"use client";

import { useMemo, useState } from "react";
import { TRAINING_METHODS } from "../xp.methods";
import { Skill } from "../xp.skills";
import { calculateActionsNeeded } from "../xp.methods.service";
import { MethodsFilters } from "./MethodsFilters";

type Props = {
  skill: Skill;
  xpNeeded: number | null;
};

export function MethodsTable({ skill, xpNeeded }: Props) {
  const [showAfkOnly, setShowAfkOnly] = useState(false);
  const [intensity, setIntensity] = useState<"all" | "low" | "medium" | "high">(
    "all",
  );

  const methods = TRAINING_METHODS[skill] || [];

  // -----------------------------
  // Filtering + Sorting
  // -----------------------------
  const processedMethods = useMemo(() => {
    let filtered = [...methods];

    // AFK filter
    if (showAfkOnly) {
      filtered = filtered.filter((m) => m.afk);
    }

    // intensity filter
    if (intensity !== "all") {
      filtered = filtered.filter((m) => m.intensity === intensity);
    }

    // sort by XP/hour DESC
    filtered.sort((a, b) => b.xpPerHour - a.xpPerHour);

    return filtered;
  }, [methods, showAfkOnly, intensity]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="space-y-4">
      {/* Filters */}
      <MethodsFilters
        showAfkOnly={showAfkOnly}
        setShowAfkOnly={setShowAfkOnly}
        intensity={intensity}
        setIntensity={setIntensity}
      />

      {/* Table */}
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr className="text-left">
              <th className="p-3">Method</th>
              <th className="p-3">XP/action</th>
              <th className="p-3">XP/hour</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {processedMethods.map((method, index) => {
              const actions =
                xpNeeded !== null
                  ? calculateActionsNeeded(xpNeeded, method)
                  : null;

              const isBest = index === 0;

              return (
                <tr
                  key={method.id}
                  className="border-t hover:bg-muted/50 transition"
                >
                  <td className="p-3 flex items-center gap-2">
                    <span>{method.name}</span>

                    {isBest && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        Best
                      </span>
                    )}

                    {method.afk && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">
                        AFK
                      </span>
                    )}
                  </td>

                  <td className="p-3">{method.xp}</td>

                  <td className="p-3 text-green-600 font-medium">
                    {method.xpPerHour.toLocaleString()}
                  </td>

                  <td className="p-3 font-semibold">
                    {actions?.toLocaleString() ?? "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
