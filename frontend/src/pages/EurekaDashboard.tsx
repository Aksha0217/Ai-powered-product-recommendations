import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eureka3D } from "@/components/3d/Eureka3D";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Server, Database, Shield, Zap, Activity, Users, Package, Settings, Globe } from "lucide-react";

interface EurekaInstance {
  appName: string;
  instanceId: string;
  hostName: string;
  port: number;
  status: 'UP' | 'DOWN' | 'STARTING';
  lastDirtyTimestamp?: string;
  registrationTime?: string;
}

const EurekaDashboard = () => {
  const [instances, setInstances] = useState<EurekaInstance[]>([
    { appName: 'API-GATEWAY', instanceId: 'api-gateway:8080', hostName: 'api-gateway', port: 8080, status: 'UP', lastDirtyTimestamp: '2024-01-15T10:30:00Z' },
    { appName: 'USER-SERVICE', instanceId: 'user-service:8082', hostName: 'user-service', port: 8082, status: 'UP', lastDirtyTimestamp: '2024-01-15T10:25:00Z' },
    { appName: 'PRODUCT-SERVICE', instanceId: 'product-service:8081', hostName: 'product-service', port: 8081, status: 'UP', lastDirtyTimestamp: '2024-01-15T10:20:00Z' },
    { appName: 'RECOMMENDATION-SERVICE', instanceId: 'recommendation-service:8083', hostName: 'recommendation-service', port: 8083, status: 'UP', lastDirtyTimestamp: '2024-01-15T10:15:00Z' },
    { appName: 'CONFIG-SERVER', instanceId: 'config-server:8888', hostName: 'config-server', port: 8888, status: 'UP', lastDirtyTimestamp: '2024-01-15T10:35:00Z' },
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

  const getAppIcon = (appName: string) => {
    switch (appName.toLowerCase()) {
      case 'api-gateway': return <Shield className="h-5 w-5 text-blue-500" />;
      case 'user-service': return <Users className="h-5 w-5 text-purple-500" />;
      case 'product-service': return <Package className="h-5 w-5 text-orange-500" />;
      case 'recommendation-service': return <Zap className="h-5 w-5 text-red-500" />;
      case 'config-server': return <Settings className="h-5 w-5 text-yellow-500" />;
      default: return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* 3D Visualization Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="h-screen relative"
      >
        <Eureka3D />

        {/* Overlay Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 text-white">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Eureka Server Online</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div>{instances.filter(i => i.status === 'UP').length}/{instances.length} Registered</div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-primary to-neon-blue bg-clip-text text-transparent">
            Eureka Service Registry
          </h2>
          <p className="text-lg text-muted-foreground/90">
            Service discovery and registration management
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Globe, label: "Total Instances", value: instances.length.toString(), color: "text-neon-blue" },
            { icon: CheckCircle, label: "Active Services", value: instances.filter(i => i.status === 'UP').length.toString(), color: "text-neon-green" },
            { icon: Activity, label: "Heartbeats", value: "1,247/min", color: "text-neon-purple" },
            { icon: Server, label: "Eureka Server", value: "UP", color: "text-neon-pink" },
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

        {/* Service Registry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Globe className="h-5 w-5 text-neon-blue" />
                Registered Instances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instances.map((instance, index) => (
                  <motion.div
                    key={instance.instanceId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getAppIcon(instance.appName)}
                            <h4 className="font-semibold text-white">{instance.appName}</h4>
                          </div>
                          <Badge variant={instance.status === 'UP' ? 'default' : 'destructive'} className="text-xs">
                            {instance.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Instance ID:</span>
                            <span className="text-white text-xs">{instance.instanceId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Host:</span>
                            <span className="text-white">{instance.hostName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Port:</span>
                            <span className="text-white">{instance.port}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Update:</span>
                            <span className="text-white text-xs">
                              {new Date(instance.lastDirtyTimestamp || '').toLocaleTimeString()}
                            </span>
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

        {/* Eureka Server Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Server className="h-5 w-5 text-neon-purple" />
                Eureka Server Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Server Settings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Port:</span>
                      <span className="text-white">8761</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Renewal Interval:</span>
                      <span className="text-white">30s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lease Duration:</span>
                      <span className="text-white">90s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Eviction Interval:</span>
                      <span className="text-white">60s</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Health Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Server Health:</span>
                      <Badge className="bg-green-500">UP</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Registry Size:</span>
                      <span className="text-white">{instances.length} instances</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Last Renewal:</span>
                      <span className="text-white text-sm">2s ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EurekaDashboard;
