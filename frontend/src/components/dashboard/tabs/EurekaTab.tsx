import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Globe, Activity, CheckCircle, AlertCircle, Zap, Database, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EurekaButton3D from "@/components/3d/EurekaButton3D";

const EurekaTab = () => {
  const navigate = useNavigate();

  const services = [
    {
      name: "API Gateway",
      status: "UP",
      port: 8080,
      host: "api-gateway",
      lastHeartbeat: "2s ago",
      instances: 1,
    },
    {
      name: "User Service",
      status: "UP",
      port: 8082,
      host: "user-service",
      lastHeartbeat: "1s ago",
      instances: 1,
    },
    {
      name: "Product Service",
      status: "UP",
      port: 8081,
      host: "product-service",
      lastHeartbeat: "3s ago",
      instances: 1,
    },
    {
      name: "Recommendation Service",
      status: "UP",
      port: 8083,
      host: "recommendation-service",
      lastHeartbeat: "1s ago",
      instances: 1,
    },
    {
      name: "Config Server",
      status: "UP",
      port: 8888,
      host: "config-server",
      lastHeartbeat: "5s ago",
      instances: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UP":
        return "bg-green-500";
      case "DOWN":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "UP":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "DOWN":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Eureka Server Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-purple-500" />
              Eureka Server Status
            </CardTitle>
            <CardDescription>
              Service discovery and registration management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{services.length}</div>
                <div className="text-sm text-muted-foreground">Total Services</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {services.filter(s => s.status === "UP").length}
                </div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">8761</div>
                <div className="text-sm text-muted-foreground">Port</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">30s</div>
                <div className="text-sm text-muted-foreground">Renewal</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Quick Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => navigate("/eureka")}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
            >
              <Zap className="h-4 w-4 mr-2" />
              View Full Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("http://localhost:8761", "_blank")}
              className="w-full"
            >
              <Server className="h-4 w-4 mr-2" />
              Eureka Admin
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 3D Eureka Button */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-500" />
            Interactive 3D Visualization
          </CardTitle>
          <CardDescription>
            Experience our microservices architecture in immersive 3D
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <EurekaButton3D />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registered Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Registered Services
          </CardTitle>
          <CardDescription>
            Current microservices registered with Eureka
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="font-semibold">{service.name}</span>
                    </div>
                    <Badge
                      variant={service.status === "UP" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {service.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Host:</span>
                      <span className="font-mono text-xs">{service.host}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Port:</span>
                      <span className="font-mono">{service.port}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Instances:</span>
                      <span>{service.instances}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Heartbeat:</span>
                      <span className="text-green-600 text-xs">{service.lastHeartbeat}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Health Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Server Health:</span>
                <Badge className="bg-green-500">UP</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Registry Size:</span>
                <span className="font-semibold">{services.length} services</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Instances:</span>
                <span className="font-semibold">{services.reduce((acc, s) => acc + s.instances, 0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Renewal:</span>
                <span className="text-green-600">1s ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Renewal Interval:</span>
                <span className="font-mono">30s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lease Duration:</span>
                <span className="font-mono">90s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Eviction Interval:</span>
                <span className="font-mono">60s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Self-Preservation:</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EurekaTab;
