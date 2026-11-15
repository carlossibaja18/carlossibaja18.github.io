/* Shared recruiter-summary primitive for case studies: results table */

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
            <td className={`px-4 sm:px-6 py-4 ${dark ? "text-[#9AA8B3]" : "text-[#454c57]"}`}>{before}</td>
            <td className={`px-4 sm:px-6 py-4 ${dark ? "text-[#9AA8B3]" : "text-[#454c57]"}`}>{after}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
