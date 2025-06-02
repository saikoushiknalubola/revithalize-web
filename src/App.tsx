
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import VehicleDetails from "./pages/VehicleDetails";
import MapView from "./pages/MapView";
import BatteryAnalytics from "./pages/BatteryAnalytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Support from "./pages/Support";
import About from "./pages/About";
import BatteryTwin from "./pages/BatteryTwin";
import EcoProgram from "./pages/EcoProgram";
import RangePrediction from "./pages/RangePrediction";
import SmartGrid from "./pages/SmartGrid";
import CompanyVisionPage from "./pages/CompanyVision";
import CarbonTracker from "./pages/CarbonTracker";
import MaintenanceAI from "./pages/MaintenanceAI";
import EnergyNetwork from "./pages/EnergyNetwork";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Index />} />
          <Route path="/welcome" element={<Index />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/:feature" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/vehicle" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />
          <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><BatteryAnalytics /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          
          {/* Smart Feature routes */}
          <Route path="/battery-twin" element={<ProtectedRoute><BatteryTwin /></ProtectedRoute>} />
          <Route path="/eco-program" element={<ProtectedRoute><EcoProgram /></ProtectedRoute>} />
          <Route path="/range-prediction" element={<ProtectedRoute><RangePrediction /></ProtectedRoute>} />
          <Route path="/smart-grid" element={<ProtectedRoute><SmartGrid /></ProtectedRoute>} />
          
          {/* Dashboard Feature routes */}
          <Route path="/company-vision" element={<ProtectedRoute><CompanyVisionPage /></ProtectedRoute>} />
          <Route path="/carbon-tracker" element={<ProtectedRoute><CarbonTracker /></ProtectedRoute>} />
          <Route path="/maintenance-ai" element={<ProtectedRoute><MaintenanceAI /></ProtectedRoute>} />
          <Route path="/energy-network" element={<ProtectedRoute><EnergyNetwork /></ProtectedRoute>} />
          
          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
