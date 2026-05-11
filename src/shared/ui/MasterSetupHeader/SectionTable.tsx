import { MoreVertical } from "lucide-react";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface SectionTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowAction?: (row: T) => void;
}

export function SectionTable<T extends { id?: string | number }>({
  columns,
  data,
  onRowAction,
}: SectionTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--mis-color-ink-200)] bg-[var(--mis-color-white)]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--mis-color-ink-200)] bg-[var(--mis-color-ink-50)]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-[var(--mis-color-ink-500)]"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wide text-[var(--mis-color-ink-500)]">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              className="border-b border-[var(--mis-color-ink-200)] transition-colors hover:bg-[var(--mis-color-ink-50)]"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4">
                  <div className="space-y-1">
                    {col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      <div className="text-[var(--mis-color-ink-900)]">
                        {typeof row[col.key] === "object"
                          ? JSON.stringify(row[col.key])
                          : String(row[col.key])}
                      </div>
                    )}
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onRowAction?.(row)}
                  className="rounded-md p-1 text-[var(--mis-color-ink-500)] transition-colors hover:bg-[var(--mis-color-ink-100)]"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
