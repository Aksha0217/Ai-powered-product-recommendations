import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Microservices3D } from "@/components/3d/Microservices3D";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Server, Database, Shield, Zap, Activity, Users, Package, Settings } from "lucide-react";

interface ServiceStatus {
  name: string;
  status: 'UP' | 'DOWN' | 'STARTING';
  port: number;
  uptime?: string;
  health?: number;
}

const MicroservicesDashboard = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Eureka Server', status: 'UP', port: 8761, uptime: '2h 15m', health: 100 },
    { name: 'Config Server', status: 'UP', port: 8888, uptime: '2h 14m', health: 98 },
    { name: 'API Gateway', status: 'UP', port: 8080, uptime: '2h 12m', health: 95 },
    { name: 'User Service', status: 'UP', port: 8082, uptime: '2h 10m', health: 97 },
    { name: 'Product Service', status: 'UP', port: 8081, uptime: '2h 8m', health: 96 },
    { name: 'Recommendation Service', status: 'UP', port: 8083, uptime: '2h 5m', health: 99 },
  ]);

  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UP': return 'bg-green-500';
      case 'DOWN': return 'bg-red-500';
      case 'STARTING': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'UP': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'DOWN': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'STARTING': return <Activity className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 3D Visualization Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-screen relative"
      >
        <Microservices3D />

        {/* Overlay Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 text-white">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All Services Online</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div>6/6 Active</div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Metrics */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-primary to-neon-blue bg-clip-text text-transparent">
            System Metrics
          </h2>
          <p className="text-lg text-muted-foreground/90">
            Real-time performance monitoring and health status
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Activity, label: "Total Requests", value: "125,430", color: "text-neon-blue" },
            { icon: Zap, label: "Avg Response", value: "45ms", color: "text-neon-green" },
            { icon: Server, label: "Active Connections", value: "234", color: "text-neon-purple" },
            { icon: Shield, label: "Error Rate", value: "0.02%", color: "text-neon-pink" },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card-hover border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-${metric.color.split('-')[1]}-500/20 to-${metric.color.split('-')[1]}-600/20`}>
                      <metric.icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Server className="h-5 w-5 text-neon-blue" />
                Service Instances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white">{service.name}</h4>
                          <Badge variant={service.status === 'UP' ? 'default' : 'destructive'} className="text-xs">
                            {service.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Port:</span>
                            <span className="text-white">{service.port}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Uptime:</span>
                            <span className="text-white">{service.uptime}</span>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Health:</span>
                              <span className="text-white">{service.health}%</span>
                            </div>
                            <Progress value={service.health} className="h-1" />
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
      </div>
    </div>
  );
};

export default MicroservicesDashboard;
