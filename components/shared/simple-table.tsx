import { StatusBadge } from "@/components/shared/status-badge";

type Column<T> = {
  key: keyof T;
  label: string;
  isStatus?: boolean;
};

type SimpleTableProps<T extends Record<string, string | number>> = {
  rows: T[];
  columns: Column<T>[];
};

export function SimpleTable<T extends Record<string, string | number>>({ rows, columns }: SimpleTableProps<T>) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                const value = row[column.key];

                return <td key={String(column.key)}>{column.isStatus ? <StatusBadge value={String(value)} /> : String(value)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
