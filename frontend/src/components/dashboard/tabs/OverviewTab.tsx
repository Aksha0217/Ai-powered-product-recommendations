import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MockData } from "@/lib/mockData";
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import {
  Radar as RadarIcon,
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Filter,
  RefreshCw,
} from "lucide-react";
import { useState, useMemo } from "react";

interface OverviewTabProps {
  data: MockData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const OverviewTab = ({ data }: OverviewTabProps) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 days');
  const [selectedUserSegment, setSelectedUserSegment] = useState('All Users');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('All');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);

  // Filtered data based on selections
  const filteredData = useMemo(() => {
    let filtered = { ...data };

    // Time-based filtering with realistic data transformation
    if (selectedDateRange === 'Today') {
      // Show hourly data for today
      filtered.timeSeries = Array.from({ length: 24 }, (_, i) => ({
        timestamp: `${i.toString().padStart(2, '0')}:00`,
        value: Math.floor(20 + Math.random() * 80 + (i > 8 && i < 22 ? 30 : 0)), // Higher during business hours
        category: data.timeSeries[i % data.timeSeries.length]?.category || 'General'
      }));
      filtered.metrics = {
        ...data.metrics,
        ctr: data.metrics.ctr * 1.2, // Higher CTR for today
        conversionRate: data.metrics.conversionRate * 1.1,
        precision: data.metrics.precision * 1.05
      };
    } else if (selectedDateRange === 'Last 7 days') {
      // Show daily data for last week
      filtered.timeSeries = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
        timestamp: day,
        value: Math.floor(800 + Math.random() * 400 + (i < 5 ? 200 : 0)), // Higher on weekdays
        category: data.timeSeries[i % data.timeSeries.length]?.category || 'General'
      }));
      filtered.metrics = {
        ...data.metrics,
        ctr: data.metrics.ctr * 0.95,
        conversionRate: data.metrics.conversionRate * 0.9,
        precision: data.metrics.precision * 0.98
      };
    }
    // Last 30 days is default (all data)

    // User segment filtering with realistic performance differences
    if (selectedUserSegment !== 'All Users') {
      if (selectedUserSegment === 'VIP Users') {
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
          value: ts.value * 1.8 // VIP users show higher engagement
        }));
      } else if (selectedUserSegment === 'New Users') {
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
          value: ts.value * 0.6 // New users show lower engagement
        }));
      } else if (selectedUserSegment === 'Returning') {
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
          value: ts.value * 1.3 // Returning users show good engagement
        }));
      }
    }

    // Category filtering
    if (selectedCategory !== 'All') {
      const categoryMultipliers = {
        'Electronics': { ctr: 1.4, conversion: 1.3, revenue: 1.5 },
        'Fashion': { ctr: 1.1, conversion: 1.0, revenue: 1.2 },
        'Home': { ctr: 0.9, conversion: 0.8, revenue: 0.9 },
        'Books': { ctr: 0.8, conversion: 0.7, revenue: 0.6 },
        'Sports': { ctr: 1.2, conversion: 1.1, revenue: 1.1 }
      };
      const multiplier = categoryMultipliers[selectedCategory as keyof typeof categoryMultipliers] || { ctr: 1, conversion: 1, revenue: 1 };

      filtered.metrics = {
        ...data.metrics,
        ctr: data.metrics.ctr * multiplier.ctr,
        conversionRate: data.metrics.conversionRate * multiplier.conversion,
        aov: data.metrics.aov * multiplier.revenue
      };
      filtered.bubbleData = data.bubbleData.filter(b =>
        b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Algorithm filtering
    if (selectedAlgorithm !== 'All') {
      const algorithmData = {
        'Collaborative': { precision: 0.82, latency: 45 },
        'Content-Based': { precision: 0.78, latency: 25 },
        'Hybrid': { precision: 0.88, latency: 65 },
        'Association Rules': { precision: 0.75, latency: 30 }
      };
      const algoKey = selectedAlgorithm.replace(' Model', '') as keyof typeof algorithmData;
      const algoInfo = algorithmData[algoKey];

      filtered.performance = data.performance.filter(p =>
        p.algorithm.toLowerCase().includes(selectedAlgorithm.toLowerCase().replace(' model', ''))
      );
      filtered.radarData = data.radarData.filter(r =>
        r.algorithm.toLowerCase().includes(selectedAlgorithm.toLowerCase().replace(' model', ''))
      );

      if (algoInfo) {
        filtered.metrics.precision = algoInfo.precision;
        filtered.performance = filtered.performance.map(p => ({
          ...p,
          latency: algoInfo.latency + Math.random() * 20 - 10
        }));
      }
    }

    return filtered;
  }, [data, selectedDateRange, selectedUserSegment, selectedCategory, selectedAlgorithm]);

  const userSegmentPieData = filteredData.userSegments.map(segment => ({
    name: segment.name,
    value: segment.count,
  }));

  const revenueDoughnutData = filteredData.userSegments.map(segment => ({
    name: segment.name,
    value: segment.revenue,
  }));

  const polarData = filteredData.userSegments.map(segment => ({
    subject: segment.name,
    A: segment.engagement * 100,
    fullMark: 100,
  }));

  return (
    <div className="space-y-8">
      {/* Header with Key Metrics */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">AI Recommendation Dashboard</h2>
          <p className="text-muted-foreground mt-1">Real-time insights into recommendation system performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Live Data
          </Badge>
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Live Users</p>
              <p className="text-3xl font-bold">{filteredData.liveUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">CTR</p>
              <p className="text-3xl font-bold">{(filteredData.metrics.ctr * 100).toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p className="text-3xl font-bold">{(filteredData.metrics.conversionRate * 100).toFixed(1)}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
              <p className="text-3xl font-bold">${filteredData.metrics.aov.toFixed(0)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Real-Time Engagement - Line Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Real-Time Engagement (24h)</h3>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Algorithm Performance - Bar Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-semibold">Algorithm Performance</h3>
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
              <Legend />
              <Bar dataKey="accuracy" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="coverage" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* User Segments - Pie Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-semibold">User Segments Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={userSegmentPieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {userSegmentPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Distribution - Doughnut Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-semibold">Revenue by User Segment</h3>
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

        {/* Multi-dimensional Algorithm Comparison - Radar Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <RadarIcon className="w-5 h-5 text-red-500" />
            <h3 className="text-xl font-semibold">Algorithm Comparison (Radar)</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={filteredData.radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="algorithm" />
              <PolarRadiusAxis angle={90} domain={[0, 1]} />
              <Radar
                name="Precision"
                dataKey="precision"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.1}
              />
              <Radar
                name="Recall"
                dataKey="recall"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.1}
              />
              <Radar
                name="Coverage"
                dataKey="coverage"
                stroke="hsl(var(--chart-3))"
                fill="hsl(var(--chart-3))"
                fillOpacity={0.1}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* CTR vs Conversion Correlation - Scatter Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-indigo-500" />
            <h3 className="text-xl font-semibold">CTR vs Conversion Correlation</h3>
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

        {/* Cumulative User Growth - Area Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-teal-500" />
            <h3 className="text-xl font-semibold">Cumulative User Growth</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={filteredData.areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue vs Recommendations - Mixed Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            <h3 className="text-xl font-semibold">Revenue vs Recommendations</h3>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={filteredData.mixedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue ($)" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="recommendations"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                name="Recommendations"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* User Segments Detailed Overview */}
      <Card className="p-6">
        <h3 className="text-2xl font-semibold mb-6">User Segments Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredData.userSegments.map((segment, idx) => (
            <div
              key={segment.name}
              className="p-6 rounded-xl bg-gradient-to-br from-card to-muted/20 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">{segment.name}</h4>
                <Badge variant={segment.engagement > 0.7 ? "default" : segment.engagement > 0.4 ? "secondary" : "outline"}>
                  {segment.engagement > 0.7 ? "High" : segment.engagement > 0.4 ? "Medium" : "Low"}
                </Badge>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Users</p>
                  <p className="text-2xl font-bold">{segment.count.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                  <p className="text-lg font-semibold">{(segment.engagement * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-lg font-semibold text-green-600">${segment.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* How It Works Section */}
      <Card className="p-8">
        <h3 className="text-2xl font-semibold mb-6">How AI Recommendations Work</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-600">Data Collection</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• User behavior tracking (clicks, views, purchases)</li>
              <li>• Real-time data processing pipeline</li>
              <li>• User profile creation and continuous updating</li>
            </ul>

            <h4 className="text-lg font-semibold mb-4 mt-6 text-green-600">Recommendation Algorithms</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium">Collaborative Filtering</h5>
                <ul className="text-sm text-muted-foreground ml-4">
                  <li>• User-based: "Users like you also liked..."</li>
                  <li>• Item-based: "People who bought X also bought Y..."</li>
                  <li>• Matrix factorization techniques</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium">Content-Based Filtering</h5>
                <ul className="text-sm text-muted-foreground ml-4">
                  <li>• Item attribute analysis</li>
                  <li>• User preference modeling</li>
                  <li>• Feature extraction and weighting</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-600">Performance Metrics</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium">Precision @K</h5>
                <p className="text-sm text-muted-foreground">Percentage of relevant items in top K recommendations</p>
              </div>
              <div>
                <h5 className="font-medium">Recall @K</h5>
                <p className="text-sm text-muted-foreground">Percentage of all relevant items found in top K</p>
              </div>
              <div>
                <h5 className="font-medium">CTR (Click-Through Rate)</h5>
                <p className="text-sm text-muted-foreground">Recommendation engagement measurement</p>
              </div>
              <div>
                <h5 className="font-medium">Coverage</h5>
                <p className="text-sm text-muted-foreground">Percentage of catalog that can be recommended</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Filters Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-xl font-semibold">Interactive Filters</h3>
        </div>

        {/* Active Filters Display */}
        {(selectedDateRange !== 'Last 30 days' || selectedUserSegment !== 'All Users' || selectedCategory !== 'All' || selectedAlgorithm !== 'All') && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>Active filters:</span>
              {selectedDateRange !== 'Last 30 days' && <Badge variant="secondary">{selectedDateRange}</Badge>}
              {selectedUserSegment !== 'All Users' && <Badge variant="secondary">{selectedUserSegment}</Badge>}
              {selectedCategory !== 'All' && <Badge variant="secondary">{selectedCategory}</Badge>}
              {selectedAlgorithm !== 'All' && <Badge variant="secondary">{selectedAlgorithm}</Badge>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedDateRange('Last 30 days');
                setSelectedUserSegment('All Users');
                setSelectedCategory('All');
                setSelectedAlgorithm('All');
                setConfidenceThreshold(0.5);
              }}
              className="text-xs"
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* DONE Button */}
        <div className="flex justify-center mt-6">
          <Button
            size="lg"
            onClick={() => {
              const params = new URLSearchParams();
              if (selectedUserSegment !== 'All Users') params.set('segment', selectedUserSegment);
              if (selectedDateRange !== 'Last 30 days') params.set('period', selectedDateRange);
              if (selectedCategory !== 'All') params.set('category', selectedCategory);
              if (selectedAlgorithm !== 'All') params.set('algorithm', selectedAlgorithm);
              window.location.href = `/results?${params.toString()}`;
            }}
            disabled={selectedDateRange === 'Last 30 days' && selectedUserSegment === 'All Users' && selectedCategory === 'All' && selectedAlgorithm === 'All'}
            className="px-8 py-3 text-lg font-semibold"
          >
            DONE - View Results
          </Button>
        </div>

        {/* Time Filters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Time Period</h4>
          <div className="flex flex-wrap gap-2">
            {['Today', 'Last 7 days', 'Last 30 days'].map((period) => (
              <Button
                key={period}
                variant={selectedDateRange === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDateRange(period)}
                className="transition-all"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* User Segment Filters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">User Segments</h4>
          <div className="flex flex-wrap gap-2">
            {['All Users', 'New Users', 'Returning Users', 'VIP Users'].map((segment) => (
              <Button
                key={segment}
                variant={selectedUserSegment === segment ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedUserSegment(segment)}
                className="transition-all"
              >
                {segment}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Product Categories</h4>
          <div className="flex flex-wrap gap-2">
            {['All', 'Electronics', 'Fashion', 'Home & Garden', 'Books', 'Sports'].map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Algorithm Filters */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Algorithms</h4>
          <div className="flex flex-wrap gap-2">
            {['All', 'Collaborative', 'Content-Based', 'Hybrid', 'Association Rules'].map((algorithm) => (
              <Button
                key={algorithm}
                variant={selectedAlgorithm === algorithm ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAlgorithm(algorithm)}
                className="transition-all"
              >
                {algorithm}
              </Button>
            ))}
          </div>
        </div>

        {/* Confidence Threshold Slider */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
            Confidence Threshold: {(confidenceThreshold * 100).toFixed(0)}%
          </h4>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.1"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0.1</span>
            <span>1.0</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OverviewTab;
