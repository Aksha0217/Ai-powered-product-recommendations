import { useState } from "react";
import Header from "@/components/dashboard/Header";
import MetricsBar from "@/components/dashboard/MetricsBar";
import TabNavigation from "@/components/dashboard/TabNavigation";
import OverviewTab from "@/components/dashboard/tabs/OverviewTab";
import UserAnalyticsTab from "@/components/dashboard/tabs/UserAnalyticsTab";
import LiveDemoTab from "@/components/dashboard/tabs/LiveDemoTab";
import EurekaTab from "@/components/dashboard/tabs/EurekaTab";
import EnhancedEurekaTab from "@/components/dashboard/tabs/EnhancedEurekaTab";
import FilterSidebar from "@/components/dashboard/FilterSidebar";
import { generateMockData } from "@/lib/mockData";

type TabType = "overview" | "userAnalytics" | "liveDemo" | "eureka" | "enhancedEureka";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isDemo, setIsDemo] = useState(false);
  const [mockData, setMockData] = useState(generateMockData());
  const [filters, setFilters] = useState({
    dateRange: [0, 100],
    algorithms: {
      collaborative: true,
      content: true,
      hybrid: true,
    },
    minConfidence: 0.7,
    userSegment: "all",
  });

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab data={mockData} />;
      case "userAnalytics":
        return <UserAnalyticsTab data={mockData} />;
      case "liveDemo":
        return <LiveDemoTab data={mockData} isDemo={isDemo} />;
      case "eureka":
        return <EurekaTab />;
      case "enhancedEureka":
        return <EnhancedEurekaTab />;
      default:
        return <OverviewTab data={mockData} />;
    }
  };

  const handleToggleDemo = () => {
    setIsDemo(!isDemo);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDemo={isDemo} onToggleDemo={handleToggleDemo} />
      <MetricsBar data={mockData} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex">
        <div className="flex-1 p-6">
          {renderTab()}
        </div>
        <FilterSidebar filters={filters} onFiltersChange={setFilters} />
      </div>
    </div>
  );
};

export default Dashboard;
