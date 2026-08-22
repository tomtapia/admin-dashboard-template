import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  caption?: string;
  className?: string;
};

export function DataTable<T>({ columns, rows, getRowKey, onRowClick, caption, className }: DataTableProps<T>) {
  return (
    <div className={cn("overflow-hidden rounded-[1rem] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)]", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface-panel)] text-left text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              {columns.map((col) => (
                <th key={col.key} className={cn("px-5 py-3 whitespace-nowrap", col.headerClassName)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {rows.map((row) => (
              <tr
                key={getRowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(onRowClick && "cursor-pointer transition-colors hover:bg-[var(--surface-panel)]")}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-5 py-4 align-middle text-[var(--foreground-muted)]", col.className)}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption ? <div className="border-t border-[var(--border)] px-5 py-3 text-xs text-[var(--muted-foreground)]">{caption}</div> : null}
    </div>
  );
}
