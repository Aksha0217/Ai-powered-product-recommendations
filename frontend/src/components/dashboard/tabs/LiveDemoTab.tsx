import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MockData } from "@/lib/mockData";
import { useState } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LiveDemoTabProps {
  data: MockData;
  isDemo: boolean;
}

const LiveDemoTab = ({ data, isDemo }: LiveDemoTabProps) => {
  const [userId, setUserId] = useState("");
  const [recommendations, setRecommendations] = useState<
    Array<{ product: string; confidence: number; reason: string }>
  >([]);

  const generateRecommendations = () => {
    const mockRecommendations = [
      {
        product: "Wireless Headphones Pro",
        confidence: 0.92,
        reason: "Based on recent audio equipment views",
      },
      {
        product: "Smart Watch Elite",
        confidence: 0.87,
        reason: "Similar to items in cart",
      },
      {
        product: "Portable Charger Max",
        confidence: 0.81,
        reason: "Frequently bought together",
      },
      {
        product: "Bluetooth Speaker",
        confidence: 0.76,
        reason: "Trending in your category",
      },
      {
        product: "Phone Case Premium",
        confidence: 0.72,
        reason: "Collaborative filtering match",
      },
    ];
    setRecommendations(mockRecommendations);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 border-neon-purple/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-br from-neon-purple to-neon-blue">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Live Recommendation Simulator</h3>
            <p className="text-sm text-muted-foreground">
              Enter a user ID to see instant AI-powered recommendations
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Enter User ID (e.g., USER_12345)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={generateRecommendations}
            className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
          >
            Generate
          </Button>
        </div>
      </Card>

      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-neon-purple" />
              Top Recommendations
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gradient-to-r from-card to-muted/20 border border-border hover:shadow-lg transition-all animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium">{rec.product}</div>
                    <div className="px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-xs font-semibold">
                      {(rec.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{rec.reason}</div>
                  <div className="mt-2 w-full h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-1000"
                      style={{ width: `${rec.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Confidence Distribution</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={recommendations}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="product"
                  stroke="hsl(var(--muted-foreground))"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="confidence" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">A/B Test Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.performance.slice(0, 3).map((perf, idx) => (
            <div
              key={perf.algorithm}
              className={`p-4 rounded-lg border-2 transition-all ${
                isDemo ? "animate-pulse-slow" : ""
              }`}
              style={{
                borderColor: `hsl(var(--chart-${idx + 1}))`,
                background: `linear-gradient(135deg, hsl(var(--chart-${idx + 1}) / 0.1) 0%, transparent 100%)`,
              }}
            >
              <div className="text-sm font-medium mb-2">{perf.algorithm}</div>
              <div className="text-2xl font-bold mb-1">
                {(perf.accuracy * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
              <div className="mt-3 text-xs">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="font-medium">{perf.latency.toFixed(0)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coverage:</span>
                  <span className="font-medium">{(perf.coverage * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {isDemo && (
        <Card className="p-6 bg-gradient-to-r from-success/10 to-neon-cyan/10 border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <div>
              <div className="font-semibold text-success">Demo Mode Active</div>
              <div className="text-sm text-muted-foreground">
                All metrics are updating in real-time every 3 seconds
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LiveDemoTab;
