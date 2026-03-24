type Props = {
  showAfkOnly: boolean;
  setShowAfkOnly: (v: boolean) => void;

  intensity: "all" | "low" | "medium" | "high";
  setIntensity: (v: Props["intensity"]) => void;
};

export function MethodsFilters({
  showAfkOnly,
  setShowAfkOnly,
  intensity,
  setIntensity,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* AFK */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={showAfkOnly}
          onChange={(e) => setShowAfkOnly(e.target.checked)}
        />
        AFK only
      </label>

      {/* Intensity */}
      <select
        value={intensity}
        onChange={(e) => setIntensity(e.target.value as Props["intensity"])}
        className="rounded-md border bg-background px-2 py-1 text-sm"
      >
        <option value="all">All intensities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
