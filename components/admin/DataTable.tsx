import type { Column } from "@/lib/adminTables";

function formatCell(value: unknown, column: Column): string {
  if (value === null || value === undefined) return "—";
  if (column.key === "created_at" && value instanceof Date) {
    return value.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export function DataTable({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Record<string, unknown>[];
}) {
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-black/10 bg-white p-8 text-center text-sm text-brand-purple-dark/60">
        No submissions yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-black/10 bg-white">
      <table className="min-w-full divide-y divide-black/10 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wide text-brand-purple-dark/60"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5">
          {rows.map((row) => (
            <tr key={String(row.id)} className="hover:bg-slate-50/60">
              {columns.map((col) => {
                const text = formatCell(row[col.key], col);
                return (
                  <td
                    key={col.key}
                    className={`px-4 py-2.5 text-brand-purple-dark ${
                      col.truncate ? "max-w-xs truncate" : "whitespace-nowrap"
                    }`}
                    title={col.truncate ? text : undefined}
                  >
                    {text}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
