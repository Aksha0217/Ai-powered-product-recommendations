import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-white text-slate-900 hover:bg-slate-100">
            <Link to="/" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="border-white text-white hover:bg-white hover:text-slate-900">
            <Link to="/microservices" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Microservices Dashboard
            </Link>
          </Button>
        </div>

        <div className="mt-12 text-slate-400">
          <p className="mb-4">Available pages:</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">•</span>
            <Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <span className="text-slate-600">•</span>
            <Link to="/features" className="hover:text-white transition-colors">Features</Link>
            <span className="text-slate-600">•</span>
            <Link to="/microservices" className="hover:text-white transition-colors">Microservices</Link>
            <span className="text-slate-600">•</span>
            <Link to="/eureka" className="hover:text-white transition-colors">Eureka</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
