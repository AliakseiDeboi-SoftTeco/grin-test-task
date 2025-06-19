import { ReactNode } from 'react';

export default function StatsTile({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="card flex flex-col items-center gap-1">
      {icon}
      <span className="kpiValue">{value}</span>
      <span className="kpiLabel">{label}</span>
    </div>
  );
}
