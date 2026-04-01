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
    <div className="overflow-x-auto rounded-lg border border-[#1a2742] bg-[#081428]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1a2742]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-sm font-semibold text-slate-400 uppercase tracking-wide"
              >
                {col.label}
              </th>
            ))}
            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-400 uppercase tracking-wide">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              className="border-b border-[#1a2742] hover:bg-[#0a1a33] transition-colors"
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4">
                  <div className="space-y-1">
                    {col.render ? (
                      col.render(row[col.key], row)
                    ) : (
                      <div className="text-white">
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
                  className="rounded-md p-1 text-slate-400 hover:bg-[#1a2742] transition-colors"
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
