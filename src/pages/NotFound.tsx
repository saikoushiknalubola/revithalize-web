
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="text-center max-w-md w-full">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-yellow-500/20 rounded-full">
              <AlertTriangle size={48} className="text-yellow-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white">404</h1>
          <p className="text-xl text-gray-400 mb-6">Oops! Page not found</p>
          <p className="text-gray-500 mb-8">
            The page at <span className="text-revithalize-green font-mono">{location.pathname}</span> could not be found.
          </p>
          <Button asChild className="bg-revithalize-green hover:bg-revithalize-green/90 text-black">
            <Link to="/" className="flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
