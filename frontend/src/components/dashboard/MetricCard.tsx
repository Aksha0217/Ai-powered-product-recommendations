import { LucideIcon, ArrowUp, ArrowDown } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend: number;
  color: string;
}

const MetricCard = ({ icon: Icon, label, value, trend, color }: MetricCardProps) => {
  const isPositive = trend >= 0;

  return (
    <div className="glass-card-hover rounded-xl p-5 group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg bg-${color}/10 group-hover:bg-${color}/20 transition-colors duration-300`}>
          <Icon className={`h-5 w-5 text-${color} group-hover:scale-110 transition-transform duration-300`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
          {isPositive ? <ArrowUp className="h-3 w-3 animate-bounce" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(trend).toFixed(1)}%
        </div>
      </div>
      <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default MetricCard;
