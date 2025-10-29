import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  isDemo: boolean;
  onToggleDemo: () => void;
}

const Header = ({ isDemo, onToggleDemo }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnDemoPage = location.pathname === "/demo";

  const handleDemoClick = () => {
    if (isOnDemoPage) {
      onToggleDemo();
    } else {
      navigate("/demo");
    }
  };

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50 shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="AI Recommendation Engine Logo" 
              className="h-12 w-12 rounded-xl shadow-lg" 
            />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#features">Features</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#dashboard">Analytics</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/product-network">Product Network</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/demo">Demo</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent neon-text">
                AI Recommendation Engine
              </h1>
              <p className="text-sm text-muted-foreground font-medium">Real-time Analytics Dashboard</p>
            </div>
          </div>
          
          <Button
            onClick={handleDemoClick}
            className={`gap-2 px-6 py-6 rounded-xl shadow-lg ${
              isDemo
                ? "bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90 shadow-[0_0_30px_rgba(236,72,153,0.4)]"
                : "bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            } transition-all duration-300 hover:scale-105`}
          >
            {isDemo ? (
              <>
                <Pause className="h-5 w-5" />
                <span className="font-semibold">Pause Demo</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span className="font-semibold">Start Demo</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
