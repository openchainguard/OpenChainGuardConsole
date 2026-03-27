import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'Active' | 'Frozen' | 'Escalation Pending' | 'APPROVED' | 'BLOCKED' | 'ESCALATED';
}

const statusStyles: Record<string, string> = {
  Active: 'bg-success/10 text-success',
  Frozen: 'bg-destructive/10 text-destructive',
  'Escalation Pending': 'bg-warning/10 text-warning',
  APPROVED: 'bg-success/10 text-success',
  BLOCKED: 'bg-destructive/10 text-destructive',
  ESCALATED: 'bg-warning/10 text-warning',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide', statusStyles[status])}>
      <span className={cn('w-1.5 h-1.5 rounded-full', {
        'bg-success': status === 'Active' || status === 'APPROVED',
        'bg-destructive': status === 'Frozen' || status === 'BLOCKED',
        'bg-warning': status === 'Escalation Pending' || status === 'ESCALATED',
      })} />
      {status}
    </span>
  );
}
