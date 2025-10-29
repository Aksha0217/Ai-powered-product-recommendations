import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateMockData, MockData } from "@/lib/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  Users,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

interface AnalysisPanelProps {
  title: string;
  performance: 'positive' | 'negative' | 'neutral';
  insights: string[];
  impact: string;
  recommendation: string;
}

const AnalysisPanel = ({ title, performance, insights, impact, recommendation }: AnalysisPanelProps) => {
  const getPerformanceIcon = () => {
    switch (performance) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'neutral':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPerformanceColor = () => {
    switch (performance) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral':
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold flex items-center gap-2">
        {getPerformanceIcon()}
        {title}
      </h4>

      <div className={`p-4 rounded-lg border ${getPerformanceColor()}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium">Current Performance:</span>
          <Badge variant={performance === 'positive' ? 'default' : performance === 'negative' ? 'destructive' : 'secondary'}>
            {performance.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div>
        <h5 className="font-medium mb-2">Key Insights:</h5>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              {insight}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="font-medium mb-2">Business Impact:</h5>
        <p className="text-sm text-muted-foreground">{impact}</p>
      </div>

      <div>
        <h5 className="font-medium mb-2">Recommendation:</h5>
        <p className="text-sm font-medium text-primary">{recommendation}</p>
      </div>
    </div>
  );
};

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState<MockData>(generateMockData());

  const filters = useMemo(() => ({
    segment: searchParams.get('segment') || 'All Users',
    period: searchParams.get('period') || 'Last 30 days',
    category: searchParams.get('category') || 'All',
    algorithm: searchParams.get('algorithm') || 'All',
  }), [searchParams]);

  // Filtered data based on URL parameters
  const filteredData = useMemo(() => {
    let filtered = { ...data };

    // Time-based filtering
    if (filters.period === 'Today') {
      filtered.timeSeries = Array.from({ length: 24 }, (_, i) => ({
        timestamp: `${i.toString().padStart(2, '0')}:00`,
        value: Math.floor(20 + Math.random() * 80 + (i > 8 && i < 22 ? 30 : 0)),
        category: 'General'
      }));
      filtered.metrics = {
        ...data.metrics,
        ctr: data.metrics.ctr * 1.2,
        conversionRate: data.metrics.conversionRate * 1.1,
        precision: data.metrics.precision * 1.05
      };
    } else if (filters.period === 'Last 7 days') {
      filtered.timeSeries = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
        timestamp: day,
        value: Math.floor(800 + Math.random() * 400 + (i < 5 ? 200 : 0)),
        category: 'General'
      }));
      filtered.metrics = {
        ...data.metrics,
        ctr: data.metrics.ctr * 0.95,
        conversionRate: data.metrics.conversionRate * 0.9,
        precision: data.metrics.precision * 0.98
      };
    }

    // User segment filtering
    if (filters.segment !== 'All Users') {
      if (filters.segment === 'VIP Users') {
        filtered.userSegments = data.userSegments.filter(s => s.name === 'VIP');
        filtered.metrics = {
          ...data.metrics,
          precision: 0.94,
          recall: 0.93,
          ctr: 0.18,
          conversionRate: 0.16,
          aov: 120
        };
        filtered.timeSeries = data.timeSeries.map(ts => ({
          ...ts,
          value: ts.value * 1.8
        }));
      } else if (filters.segment === 'New Users') {
        filtered.userSegments = data.userSegments.filter(s => s.name === 'New Users');
        filtered.metrics = {
          ...data.metrics,
          precision: 0.72,
          recall: 0.69,
          ctr: 0.08,
          conversionRate: 0.05,
          aov: 65
        };
        filtered.timeSeries = data.timeSeries.map(ts => ({
          ...ts,
          value: ts.value * 0.6
        }));
      } else if (filters.segment === 'Returning Users') {
        filtered.userSegments = data.userSegments.filter(s => s.name === 'Returning');
        filtered.metrics = {
          ...data.metrics,
          precision: 0.89,
          recall: 0.91,
          ctr: 0.14,
          conversionRate: 0.12,
          aov: 95
        };
        filtered.timeSeries = data.timeSeries.map(ts => ({
          ...ts,
          value: ts.value * 1.3
        }));
      }
    }

    // Category filtering
    if (filters.category !== 'All') {
      const categoryMultipliers = {
        'Electronics': { ctr: 1.4, conversion: 1.3, revenue: 1.5 },
        'Fashion': { ctr: 1.1, conversion: 1.0, revenue: 1.2 },
        'Home': { ctr: 0.9, conversion: 0.8, revenue: 0.9 },
        'Books': { ctr: 0.8, conversion: 0.7, revenue: 0.6 },
        'Sports': { ctr: 1.2, conversion: 1.1, revenue: 1.1 }
      };
      const multiplier = categoryMultipliers[filters.category as keyof typeof categoryMultipliers] || { ctr: 1, conversion: 1, revenue: 1 };

      filtered.metrics = {
        ...data.metrics,
        ctr: data.metrics.ctr * multiplier.ctr,
        conversionRate: data.metrics.conversionRate * multiplier.conversion,
        aov: data.metrics.aov * multiplier.revenue
      };
    }

    return filtered;
  }, [data, filters]);

  const userSegmentPieData = filteredData.userSegments.map(segment => ({
    name: segment.name,
    value: segment.count,
  }));

  const revenueDoughnutData = filteredData.userSegments.map(segment => ({
    name: segment.name,
    value: segment.revenue,
  }));

  // Generate analysis based on filtered data
  const getEngagementAnalysis = (): AnalysisPanelProps => {
    const avgEngagement = filteredData.timeSeries.reduce((sum, ts) => sum + ts.value, 0) / filteredData.timeSeries.length;
    const isPositive = avgEngagement > 100;
    const isVIP = filters.segment === 'VIP Users';

    return {
      title: "User Engagement Analysis",
      performance: isPositive ? 'positive' : 'neutral',
      insights: [
        `Average engagement: ${avgEngagement.toFixed(0)} ${filters.period === 'Today' ? 'per hour' : 'per day'}`,
        isVIP ? 'VIP users show 80% higher engagement than average' : 'Engagement patterns follow expected user behavior',
        `${filters.period === 'Today' ? 'Peak activity during business hours (9AM-10PM)' : 'Consistent engagement throughout the week'}`
      ],
      impact: isPositive
        ? 'Higher engagement correlates with increased user retention and lifetime value'
        : 'Stable engagement indicates consistent user interest but limited growth potential',
      recommendation: isPositive
        ? 'Scale successful engagement strategies and maintain peak performance periods'
        : 'Implement targeted campaigns to boost engagement during low-activity periods'
    };
  };

  const getAlgorithmAnalysis = (): AnalysisPanelProps => {
    const topAlgorithm = filteredData.performance.reduce((prev, current) =>
      prev.accuracy > current.accuracy ? prev : current
    );
    const isHighPerformance = topAlgorithm.accuracy > 0.85;

    return {
      title: "Algorithm Performance Analysis",
      performance: isHighPerformance ? 'positive' : 'neutral',
      insights: [
        `Best performing algorithm: ${topAlgorithm.algorithm} (${(topAlgorithm.accuracy * 100).toFixed(1)}% accuracy)`,
        `Average latency: ${filteredData.performance.reduce((sum, p) => sum + p.latency, 0) / filteredData.performance.length}ms`,
        `${filters.segment} segment shows ${isHighPerformance ? 'excellent' : 'moderate'} algorithm effectiveness`
      ],
      impact: isHighPerformance
        ? 'High-quality recommendations drive better user experience and conversion rates'
        : 'Algorithm performance needs optimization to improve recommendation quality',
      recommendation: isHighPerformance
        ? 'Continue optimizing top-performing algorithms and consider A/B testing improvements'
        : 'Invest in algorithm training data and consider hybrid approaches for better performance'
    };
  };

  const getRevenueAnalysis = (): AnalysisPanelProps => {
    const totalRevenue = filteredData.userSegments.reduce((sum, segment) => sum + segment.revenue, 0);
    const vipRevenue = filteredData.userSegments.find(s => s.name === 'VIP')?.revenue || 0;
    const vipPercentage = (vipRevenue / totalRevenue) * 100;
    const isHighConcentration = vipPercentage > 60;

    return {
      title: "Revenue Distribution Analysis",
      performance: isHighConcentration ? 'positive' : 'neutral',
      insights: [
        `Total revenue: $${totalRevenue.toLocaleString()}`,
        `VIP segment contributes ${vipPercentage.toFixed(1)}% of total revenue`,
        `Average order value: $${filteredData.metrics.aov.toFixed(0)}`
      ],
      impact: isHighConcentration
        ? 'Strong revenue concentration in high-value segments indicates efficient resource allocation'
        : 'Revenue distribution suggests opportunities to increase profitability across all segments',
      recommendation: isHighConcentration
        ? 'Protect and grow VIP segment while maintaining service quality for all users'
        : 'Develop strategies to increase revenue contribution from underperforming segments'
    };
  };

  const getCorrelationAnalysis = (): AnalysisPanelProps => {
    const correlation = 0.85; // Mock correlation coefficient
    const isStrongCorrelation = correlation > 0.7;

    return {
      title: "CTR vs Conversion Analysis",
      performance: isStrongCorrelation ? 'positive' : 'neutral',
      insights: [
        `Correlation coefficient: ${correlation.toFixed(2)} between CTR and conversion`,
        `${filters.category} category shows ${isStrongCorrelation ? 'strong' : 'moderate'} performance relationship`,
        `Higher CTR consistently leads to improved conversion rates`
      ],
      impact: isStrongCorrelation
        ? 'Clear relationship between engagement and sales enables predictable optimization'
        : 'Complex relationship requires more sophisticated analysis and testing',
      recommendation: isStrongCorrelation
        ? 'Focus on CTR optimization strategies to drive conversion improvements'
        : 'Conduct deeper analysis to understand factors affecting conversion rates'
    };
  };

  const activeFilters = [filters.segment, filters.period, filters.category, filters.algorithm]
    .filter(f => f !== 'All Users' && f !== 'Last 30 days' && f !== 'All' && f !== 'All');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Filtered Results</h1>
            <p className="text-muted-foreground mt-2">Detailed analysis of your selected filters</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/demo')} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Filters
          </Button>
        </div>

        {/* Active Filters Summary */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Active Filters</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.length > 0 ? (
              activeFilters.map((filter, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  {filter}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground">No filters applied (showing all data)</p>
            )}
          </div>
        </Card>

        {/* Charts with Analysis */}
        <div className="space-y-12">
          {/* User Engagement Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl font-semibold">
                  User Engagement Trend ({filters.period})
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={filteredData.timeSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <AnalysisPanel
                title="User Engagement Analysis"
                {...getEngagementAnalysis()}
              />
            </Card>
          </div>

          {/* Algorithm Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-green-500" />
                <h3 className="text-xl font-semibold">
                  Algorithm Performance ({filters.segment})
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={filteredData.performance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="algorithm" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="accuracy" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <AnalysisPanel
                title="Algorithm Performance Analysis"
                {...getAlgorithmAnalysis()}
              />
            </Card>
          </div>

          {/* Revenue Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-yellow-500" />
                <h3 className="text-xl font-semibold">
                  Revenue Distribution ({filters.segment})
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={revenueDoughnutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueDoughnutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <AnalysisPanel
                title="Revenue Distribution Analysis"
                {...getRevenueAnalysis()}
              />
            </Card>
          </div>

          {/* CTR vs Conversion Correlation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-indigo-500" />
                <h3 className="text-xl font-semibold">
                  CTR vs Conversion Correlation ({filters.category})
                </h3>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart data={filteredData.scatterData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    type="number"
                    dataKey="ctr"
                    name="CTR"
                    domain={['dataMin - 0.01', 'dataMax + 0.01']}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    type="number"
                    dataKey="conversionRate"
                    name="Conversion Rate"
                    domain={['dataMin - 0.01', 'dataMax + 0.01']}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Scatter name="Data Points" dataKey="conversionRate" fill="hsl(var(--chart-1))" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <AnalysisPanel
                title="CTR vs Conversion Analysis"
                {...getCorrelationAnalysis()}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
