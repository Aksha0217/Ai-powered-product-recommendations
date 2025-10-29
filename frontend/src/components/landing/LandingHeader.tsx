import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const LandingHeader = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "How it Works", path: "/how-it-works" },
    { label: "Features", path: "/features" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Eureka", path: "/eureka" },
  ];

  return (
    <header className="bg-transparent sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-white hover:text-neon-blue transition-colors ${
                location.pathname === item.path || location.hash === item.path
                  ? "text-neon-blue border-b-2 border-neon-blue"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Login
          </Button>
          <Button className="bg-white text-primary hover:bg-white/90">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};
