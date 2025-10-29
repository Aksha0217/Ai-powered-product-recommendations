import { TrendingUp, Target, MousePointer, ShoppingCart, DollarSign } from "lucide-react";
import { MockData } from "@/lib/mockData";
import MetricCard from "./MetricCard";

interface MetricsBarProps {
  data: MockData;
}

const MetricsBar = ({ data }: MetricsBarProps) => {
  const { metrics } = data;

  return (
    <div className="border-b border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <MetricCard
            icon={Target}
            label="Precision @10"
            value={`${(metrics.precision * 100).toFixed(1)}%`}
            trend={+2.4}
            color="neon-purple"
          />
          <MetricCard
            icon={TrendingUp}
            label="Recall @10"
            value={`${(metrics.recall * 100).toFixed(1)}%`}
            trend={+1.8}
            color="neon-blue"
          />
          <MetricCard
            icon={MousePointer}
            label="CTR"
            value={`${(metrics.ctr * 100).toFixed(2)}%`}
            trend={+0.5}
            color="neon-cyan"
          />
          <MetricCard
            icon={ShoppingCart}
            label="Conversion"
            value={`${(metrics.conversionRate * 100).toFixed(2)}%`}
            trend={+1.2}
            color="neon-pink"
          />
          <MetricCard
            icon={DollarSign}
            label="AOV"
            value={`$${metrics.aov.toFixed(0)}`}
            trend={+5.3}
            color="success"
          />
        </div>
      </div>
    </div>
  );
};

export default MetricsBar;
