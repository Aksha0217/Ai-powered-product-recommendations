import { useState, useEffect } from "react";
import Header from "@/components/dashboard/Header";
import MetricsBar from "@/components/dashboard/MetricsBar";
import TabNavigation from "@/components/dashboard/TabNavigation";
import FilterSidebar from "@/components/dashboard/FilterSidebar";
import OverviewTab from "@/components/dashboard/tabs/OverviewTab";
import UserAnalyticsTab from "@/components/dashboard/tabs/UserAnalyticsTab";
import LiveDemoTab from "@/components/dashboard/tabs/LiveDemoTab";
import EurekaTab from "@/components/dashboard/tabs/EurekaTab";
import { generateMockData, type MockData } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

type TabType = "overview" | "userAnalytics" | "liveDemo" | "eureka";

const Demo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isDemo, setIsDemo] = useState(true);
  const [mockData, setMockData] = useState<MockData>(generateMockData());
  const [filters, setFilters] = useState({
    dateRange: [0, 100],
    algorithms: {
      collaborative: true,
      content: true,
      hybrid: true,
    },
    minConfidence: 0.5,
    userSegment: "all",
  });

  useEffect(() => {
    if (isDemo) {
      const interval = setInterval(() => {
        setMockData(generateMockData());
      }, 5000); // Update every 5 seconds for real-time feel
      return () => clearInterval(interval);
    }
  }, [isDemo]);

  const handleToggleDemo = () => {
    if (isDemo) {
      navigate("/");
    } else {
      setIsDemo(true);
    }
  };

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
      default:
        return <OverviewTab data={mockData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDemo={isDemo} onToggleDemo={handleToggleDemo} />
      <MetricsBar data={mockData} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-6">
          <div className="flex-1">
            {renderTab()}
          </div>
          <FilterSidebar filters={filters} onFiltersChange={setFilters} />
        </div>
      </main>
    </div>
  );
};

export default Demo;
