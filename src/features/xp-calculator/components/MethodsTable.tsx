import { XP_METHODS } from "../xp.methods";
import {
  calculateActionsNeeded,
  calculateXpPerHour,
} from "../xp.methods.service";
import { Skill } from "../xp.skills";

type Props = {
  skill: Skill;
  xpNeeded: number | null;
};

export function MethodsTable({ skill, xpNeeded }: Props) {
  const methods = XP_METHODS.filter((m) => m.skill === skill)
    .map((method) => {
      const actions = xpNeeded
        ? calculateActionsNeeded(xpNeeded, method.xpPerAction)
        : 0;

      const xpPerHour = calculateXpPerHour(
        method.xpPerAction,
        method.actionsPerHour,
      );

      return {
        ...method,
        actions,
        xpPerHour,
      };
    })
    // 🔥 ordena por melhor método
    .sort((a, b) => a.actions - b.actions);

  if (!xpNeeded || xpNeeded <= 0) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        Enter valid levels to see training methods
      </p>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        {/* HEADER */}
        <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="p-3 text-left">Method</th>
            <th className="p-3 text-right">XP/action</th>
            <th className="p-3 text-right">XP/hour</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {methods.map((method, index) => {
            const isBest = index === 0;

            return (
              <tr
                key={method.id}
                className={`
                  border-t transition
                  ${isBest ? "bg-primary/10" : "hover:bg-muted/40"}
                `}
              >
                {/* Method */}
                <td className="p-3 flex items-center gap-2">
                  {/* future icon */}
                  <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs">
                    ⚔️
                  </div>

                  <span className="font-medium">{method.name}</span>

                  {isBest && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded bg-primary text-primary-foreground">
                      Best
                    </span>
                  )}
                </td>

                {/* XP per action */}
                <td className="p-3 text-right">
                  {method.xpPerAction.toLocaleString()}
                </td>

                {/* XP/hour */}
                <td className="p-3 text-right text-green-500 font-medium">
                  {method.xpPerHour.toLocaleString()}
                </td>

                {/* Actions */}
                <td className="p-3 text-right font-semibold">
                  {method.actions.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
