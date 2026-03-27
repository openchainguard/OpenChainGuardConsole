import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  score: number;
  size?: 'sm' | 'lg';
  label?: string;
  color?: string;
}

export function RiskGauge({ score, size = 'sm', label, color }: RiskGaugeProps) {
  const sizeClass = size === 'lg' ? 'w-24 h-24' : 'w-10 h-10';
  const textClass = size === 'lg' ? 'text-2xl font-bold' : 'text-xs font-semibold';
  const strokeWidth = size === 'lg' ? 4 : 3;
  const radius = size === 'lg' ? 42 : 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (score <= 30) return 'hsl(var(--success))';
    if (score <= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn('relative', sizeClass)}>
        <svg className="w-full h-full -rotate-90" viewBox={size === 'lg' ? '0 0 96 96' : '0 0 36 36'}>
          <circle cx={size === 'lg' ? 48 : 18} cy={size === 'lg' ? 48 : 18} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth={strokeWidth} />
          <circle cx={size === 'lg' ? 48 : 18} cy={size === 'lg' ? 48 : 18} r={radius} fill="none" stroke={getColor()} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
        </svg>
        <span className={cn('absolute inset-0 flex items-center justify-center', textClass)} style={{ color: getColor() }}>
          {score}
        </span>
      </div>
      {label && <span className="text-[10px] text-muted-foreground font-medium">{label}</span>}
    </div>
  );
}
