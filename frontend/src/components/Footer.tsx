import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl py-8 mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            © 2025 AI Recommendation Engine Valencian | All Rights Reserved
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
