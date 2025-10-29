import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Server,
  Globe,
  Activity,
  CheckCircle,
  AlertCircle,
  Zap,
  Database,
  Shield,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Cpu,
  BarChart3,
  RefreshCw,
  Wifi,
  WifiOff,
  Eye,
  Target,
  Clock,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

interface BusinessMetrics {
  activeUsers: number;
  revenue: number;
  conversionRate: number;
  aiAccuracy: number;
  systemHealth: number;
  timestamp: string;
}

interface AIPerformance {
  modelName: string;
  accuracy: number;
  latency: number;
  throughput: number;
  lastUpdated: string;
}

interface ScalingRecommendation {
  serviceName: string;
  currentInstances: number;
  recommendedInstances: number;
  reason: string;
  confidence: number;
  timestamp: string;
}

interface DashboardUpdate {
  businessMetrics: BusinessMetrics;
  aiPerformance: AIPerformance[];
  scalingRecommendations: ScalingRecommendation[];
  timestamp: string;
}

const EnhancedEurekaTab = () => {
  const [businessMetrics, setBusinessMetrics] = useState<BusinessMetrics | null>(null);
  const [aiPerformance, setAiPerformance] = useState<AIPerformance[]>([]);
  const [scalingRecommendations, setScalingRecommendations] = useState<ScalingRecommendation[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  const mockBusinessMetrics: BusinessMetrics = {
    activeUsers: 1247,
    revenue: 45678.90,
    conversionRate: 0.124,
    aiAccuracy: 0.892,
    systemHealth: 0.967,
    timestamp: new Date().toISOString()
  };

  const mockAiPerformance: AIPerformance[] = [
    { modelName: "Recommendation Engine", accuracy: 0.892, latency: 45, throughput: 1250, lastUpdated: new Date().toISOString() },
    { modelName: "Fraud Detection", accuracy: 0.956, latency: 23, throughput: 890, lastUpdated: new Date().toISOString() },
    { modelName: "Personalization", accuracy: 0.834, latency: 67, throughput: 2100, lastUpdated: new Date().toISOString() }
  ];

  const mockScalingRecommendations: ScalingRecommendation[] = [
    { serviceName: "recommendation-service", currentInstances: 2, recommendedInstances: 3, reason: "High traffic detected", confidence: 0.85, timestamp: new Date().toISOString() },
    { serviceName: "user-service", currentInstances: 1, recommendedInstances: 2, reason: "CPU utilization > 80%", confidence: 0.92, timestamp: new Date().toISOString() }
  ];

  useEffect(() => {
    // Initialize with mock data
    setBusinessMetrics(mockBusinessMetrics);
    setAiPerformance(mockAiPerformance);
    setScalingRecommendations(mockScalingRecommendations);
    setIsConnected(true);

    // Simulate WebSocket connection for real-time updates
    const interval = setInterval(() => {
      // Simulate real-time updates
      setBusinessMetrics(prev => prev ? {
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        revenue: prev.revenue + Math.random() * 100 - 50,
        timestamp: new Date().toISOString()
      } : null);
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchBusinessMetrics = async () => {
    try {
      // In production, this would connect to the actual backend
      // const response = await fetch('http://localhost:8761/api/dashboard/business-metrics');
      // const data = await response.json();
      setBusinessMetrics(mockBusinessMetrics);
      setError(null);
    } catch (err) {
      setError('Failed to fetch business metrics');
    }
  };

  const fetchAiPerformance = async () => {
    try {
      // const response = await fetch('http://localhost:8761/api/dashboard/ai-performance');
      // const data = await response.json();
      setAiPerformance(mockAiPerformance);
      setError(null);
    } catch (err) {
      setError('Failed to fetch AI performance data');
    }
  };

  const fetchScalingRecommendations = async () => {
    try {
      // const response = await fetch('http://localhost:8761/api/dashboard/scaling-recommendations');
      // const data = await response.json();
      setScalingRecommendations(mockScalingRecommendations);
      setError(null);
    } catch (err) {
      setError('Failed to fetch scaling recommendations');
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 0.9) return "text-green-500";
    if (health >= 0.7) return "text-yellow-500";
    return "text-red-500";
  };

  const getHealthBadge = (health: number) => {
    if (health >= 0.9) return <Badge className="bg-green-500">Excellent</Badge>;
    if (health >= 0.7) return <Badge className="bg-yellow-500">Good</Badge>;
    return <Badge variant="destructive">Critical</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Alert className={`${isConnected ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
          <div className="flex items-center gap-2">
            {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
            <AlertDescription>
              {isConnected ? 'Connected to Eureka Dashboard - Real-time updates active' : 'Disconnected from Eureka Dashboard'}
            </AlertDescription>
          </div>
        </Alert>
      </motion.div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ELITE Eureka Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">Real-time business intelligence and AI performance monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Live Data
          </Badge>
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
          <Button variant="outline" size="sm" onClick={() => {
            fetchBusinessMetrics();
            fetchAiPerformance();
            fetchScalingRecommendations();
          }}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Business Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold text-blue-600">{businessMetrics?.activeUsers.toLocaleString() || 'N/A'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">+12.5%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold text-green-600">${businessMetrics?.revenue.toLocaleString() || 'N/A'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">+8.2%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold text-purple-600">{((businessMetrics?.conversionRate || 0) * 100).toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">+3.1%</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
                <p className="text-3xl font-bold text-orange-600">{((businessMetrics?.aiAccuracy || 0) * 100).toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">+2.4%</span>
                </div>
              </div>
              <Cpu className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-500/10 to-teal-600/10 border-teal-500/20 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                <p className={`text-3xl font-bold ${getHealthColor(businessMetrics?.systemHealth || 0)}`}>
                  {((businessMetrics?.systemHealth || 0) * 100).toFixed(1)}%
                </p>
                <div className="mt-2">
                  {getHealthBadge(businessMetrics?.systemHealth || 0)}
                </div>
              </div>
              <Activity className="w-8 h-8 text-teal-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Performance Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Cpu className="h-5 w-5 text-purple-500" />
              AI Performance Monitoring
            </CardTitle>
            <CardDescription className="text-slate-300">
              Real-time performance metrics for AI models and services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiPerformance.map((model, index) => (
                <motion.div
                  key={model.modelName}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">{model.modelName}</h4>
                        <Badge variant="outline" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Live
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-slate-300">Accuracy</span>
                            <span className="text-sm font-semibold text-green-400">
                              {(model.accuracy * 100).toFixed(1)}%
                            </span>
                          </div>
                          <Progress value={model.accuracy * 100} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Latency</span>
                            <p className="text-white font-semibold">{model.latency}ms</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Throughput</span>
                            <p className="text-white font-semibold">{model.throughput}/s</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-white/10">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Last updated</span>
                            <span>{new Date(model.lastUpdated).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scaling Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Predictive Scaling Recommendations
            </CardTitle>
            <CardDescription>
              AI-driven scaling suggestions based on current metrics and predicted load
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scalingRecommendations.map((rec, index) => (
                <motion.div
                  key={`${rec.serviceName}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-amber-500/20 rounded-lg">
                      <Server className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{rec.serviceName}</h4>
                      <p className="text-sm text-slate-300">{rec.reason}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-slate-400">Current</p>
                      <p className="text-lg font-bold text-white">{rec.currentInstances}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-400">Recommended</p>
                      <p className="text-lg font-bold text-green-400">{rec.recommendedInstances}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-400">Confidence</p>
                      <Badge variant="outline" className="text-xs">
                        {(rec.confidence * 100).toFixed(0)}%
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" className="ml-4">
                      <Zap className="w-4 h-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Health Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              System Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Health</span>
                  <span className="text-sm text-emerald-600 font-semibold">
                    {((businessMetrics?.systemHealth || 0) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress value={(businessMetrics?.systemHealth || 0) * 100} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Uptime</p>
                  <p className="text-lg font-bold text-white">99.9%</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">Response Time</p>
                  <p className="text-lg font-bold text-white">45ms</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-500" />
              Service Registry Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-white">API Gateway</span>
                </div>
                <Badge className="bg-green-500">UP</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-white">User Service</span>
                </div>
                <Badge className="bg-green-500">UP</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-white">Product Service</span>
                </div>
                <Badge className="bg-green-500">UP</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-white">Recommendation Service</span>
                </div>
                <Badge className="bg-green-500">UP</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real-time Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-slate-400" />
              Real-time Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[
                { time: "14:32:15", event: "User recommendation generated", service: "recommendation-service", type: "success" },
                { time: "14:32:12", event: "AI model accuracy updated", service: "ai-performance", type: "info" },
                { time: "14:32:08", event: "Scaling recommendation triggered", service: "predictive-scaling", type: "warning" },
                { time: "14:32:05", event: "Business metrics refreshed", service: "business-metrics", type: "success" },
                { time: "14:32:01", event: "Service health check passed", service: "eureka-server", type: "success" },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' :
                    activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-xs text-slate-400 font-mono">{activity.time}</span>
                  <span className="text-white flex-1">{activity.event}</span>
                  <Badge variant="outline" className="text-xs">{activity.service}</Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EnhancedEurekaTab;
