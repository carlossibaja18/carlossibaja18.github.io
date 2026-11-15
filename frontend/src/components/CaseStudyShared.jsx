/* Shared recruiter-summary primitives for case studies: results table + grey TO-ADD placeholders */

export const ResultsTable = ({ rows, dark, accent, testid }) => (
  <div data-testid={testid} className={`overflow-x-auto rounded-xl border ${dark ? "border-white/10" : "border-black/10"}`}>
    <table className="w-full min-w-[480px] text-left text-sm">
      <thead>
        <tr className={dark ? "border-b border-white/10" : "border-b border-black/10"}>
          {["Metric", "Before", "After"].map((h) => (
            <th key={h} className={`px-4 sm:px-6 py-3.5 font-mono text-[11px] tracking-[0.2em] uppercase font-normal ${dark ? "text-[#67D7FF]" : ""}`} style={dark ? undefined : { color: accent }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([metric, before, after], i) => (
          <tr key={i} className={dark ? "border-b border-white/5 last:border-0" : "border-b border-black/5 last:border-0"}>
            <td className={`px-4 sm:px-6 py-4 font-medium ${dark ? "text-[#F3F7FA]" : "text-[#2b313a]"}`}>{metric}</td>
            <td className="px-4 sm:px-6 py-4">
              {before.startsWith("[TO ADD:") ? <PlaceholderCell dark={dark} label={before} /> : <span className={dark ? "text-[#9AA8B3]" : "text-[#454c57]"}>{before}</span>}
            </td>
            <td className="px-4 sm:px-6 py-4">
              {after.startsWith("[TO ADD:") ? <PlaceholderCell dark={dark} label={after} /> : <span className={dark ? "text-[#9AA8B3]" : "text-[#454c57]"}>{after}</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PlaceholderCell = ({ label, dark }) => (
  <span className={`inline-block rounded-md border border-dashed px-3 py-1.5 font-mono text-xs ${
    dark ? "border-white/25 bg-white/[0.06] text-[#8794a0]" : "border-[#9aa0a8]/70 bg-[#9aa0a8]/15 text-[#6a7178]"
  }`}>
    {label}
  </span>
);

export const PlaceholderBox = ({ label, dark, testid }) => (
  <div
    data-testid={testid}
    className={`rounded-lg border border-dashed aspect-[4/3] grid place-items-center p-6 text-center font-mono text-xs leading-relaxed ${
      dark ? "border-white/25 bg-white/[0.04] text-[#8794a0]" : "border-[#9aa0a8]/70 bg-[#9aa0a8]/12 text-[#6a7178]"
    }`}
  >
    {label}
  </div>
);
