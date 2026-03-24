import { XP_METHODS } from "../xp.methods";
import { calculateActionsNeeded } from "../xp.methods.service";
import { Skill } from "../xp.skills";

type Props = {
  skill: Skill;
  xpNeeded: number | null;
};

export function MethodsTable({ skill, xpNeeded }: Props) {
  const methods = XP_METHODS.filter((m) => m.skill === skill);

  if (!xpNeeded || xpNeeded <= 0) {
    return (
      <p className="text-sm text-muted-foreground text-center">
        Enter valid levels to see training methods
      </p>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left">
          <tr>
            <th className="p-3">Method</th>
            <th className="p-3">XP / action</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {methods.map((method) => {
            const actions = calculateActionsNeeded(xpNeeded, method);

            return (
              <tr
                key={method.id}
                className="border-t hover:bg-muted/50 transition"
              >
                <td className="p-3 font-medium">{method.name}</td>
                <td className="p-3">{method.xpPerAction}</td>
                <td className="p-3 text-right">{actions.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
