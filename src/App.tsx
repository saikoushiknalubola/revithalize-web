
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

// Professional Feature Pages
import FleetManagement from "./pages/FleetManagement";
import AdvancedAnalytics from "./pages/AdvancedAnalytics";
import SystemMonitoring from "./pages/SystemMonitoring";
import EnergyOptimization from "./pages/EnergyOptimization";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
import PerformanceOptimization from "./pages/PerformanceOptimization";
import IntegrationHub from "./pages/IntegrationHub";
import ComplianceManager from "./pages/ComplianceManager";
import ChargingIntelligence from "./pages/ChargingIntelligence";
import NotificationCenter from "./pages/NotificationCenter";
import CustomerManagement from "./pages/CustomerManagement";
import SecurityManager from "./pages/SecurityManager";
import ReportsExport from "./pages/ReportsExport";
import AIInsights from "./pages/AIInsights";

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
          
          {/* Professional Tool routes */}
          <Route path="/fleet-management" element={<ProtectedRoute><FleetManagement /></ProtectedRoute>} />
          <Route path="/advanced-analytics" element={<ProtectedRoute><AdvancedAnalytics /></ProtectedRoute>} />
          <Route path="/system-monitoring" element={<ProtectedRoute><SystemMonitoring /></ProtectedRoute>} />
          <Route path="/energy-optimization" element={<ProtectedRoute><EnergyOptimization /></ProtectedRoute>} />
          <Route path="/predictive-analytics" element={<ProtectedRoute><PredictiveAnalytics /></ProtectedRoute>} />
          <Route path="/performance-optimization" element={<ProtectedRoute><PerformanceOptimization /></ProtectedRoute>} />
          <Route path="/integration-hub" element={<ProtectedRoute><IntegrationHub /></ProtectedRoute>} />
          <Route path="/compliance-manager" element={<ProtectedRoute><ComplianceManager /></ProtectedRoute>} />
          <Route path="/charging-intelligence" element={<ProtectedRoute><ChargingIntelligence /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
          <Route path="/customer-management" element={<ProtectedRoute><CustomerManagement /></ProtectedRoute>} />
          <Route path="/security" element={<ProtectedRoute><SecurityManager /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportsExport /></ProtectedRoute>} />
          <Route path="/ai-insights" element={<ProtectedRoute><AIInsights /></ProtectedRoute>} />
          
          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
