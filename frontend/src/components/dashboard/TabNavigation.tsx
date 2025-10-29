import { BarChart3, Users, Sparkles, Server, Crown } from "lucide-react";

type TabType = "overview" | "userAnalytics" | "liveDemo" | "eureka" | "enhancedEureka";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: "overview" as const, label: "Overview", icon: BarChart3 },
  { id: "userAnalytics" as const, label: "User Analytics", icon: Users },
  { id: "liveDemo" as const, label: "Live Demo", icon: Sparkles },
  { id: "eureka" as const, label: "Eureka Server", icon: Server },
  { id: "enhancedEureka" as const, label: "ELITE Dashboard", icon: Crown, premium: true },
];

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-[73px] z-40">
      <div className="container mx-auto px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all duration-300 ${
                  isActive
                    ? tab.premium
                      ? "border-purple-500 text-purple-600 font-semibold bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                      : "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                {tab.premium && (
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full ml-1">
                    ELITE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
