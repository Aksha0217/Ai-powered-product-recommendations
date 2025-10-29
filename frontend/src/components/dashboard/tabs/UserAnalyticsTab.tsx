import { Card } from "@/components/ui/card";
import { MockData } from "@/lib/mockData";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface UserAnalyticsTabProps {
  data: MockData;
}

const UserAnalyticsTab = ({ data }: UserAnalyticsTabProps) => {
  const scatterData = data.userSegments.map((segment, idx) => ({
    name: segment.name,
    engagement: segment.engagement * 100,
    revenue: segment.revenue / 1000,
    count: segment.count,
  }));

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Segmentation Analysis</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              dataKey="engagement"
              name="Engagement"
              unit="%"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis
              type="number"
              dataKey="revenue"
              name="Revenue"
              unit="K"
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Scatter name="User Segments" data={scatterData}>
              {scatterData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Behavior Patterns</h3>
          <div className="space-y-4">
            {data.userSegments.map((segment, idx) => (
              <div key={segment.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[idx % colors.length] }}
                  />
                  <span className="text-sm">{segment.name}</span>
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Count: </span>
                    <span className="font-semibold">{segment.count.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engagement: </span>
                    <span className="font-semibold">
                      {(segment.engagement * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Live Statistics</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/20">
              <div className="text-sm text-muted-foreground mb-1">Active Users</div>
              <div className="text-3xl font-bold text-neon-purple">
                {data.liveUsers.toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-neon-cyan/10 to-success/10 border border-neon-cyan/20">
              <div className="text-sm text-muted-foreground mb-1">Total Sessions Today</div>
              <div className="text-3xl font-bold text-neon-cyan">
                {(data.liveUsers * 1.8).toFixed(0)}
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-neon-pink/10 to-warning/10 border border-neon-pink/20">
              <div className="text-sm text-muted-foreground mb-1">Avg Session Duration</div>
              <div className="text-3xl font-bold text-neon-pink">4:32</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserAnalyticsTab;
