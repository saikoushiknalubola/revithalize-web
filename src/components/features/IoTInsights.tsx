
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, ThermometerSnowflake, AlertTriangle, Gauge, Activity, Zap } from 'lucide-react';
import { useScreenSize } from '@/hooks/use-mobile';

export function IoTInsights() {
  const { isMobile } = useScreenSize();
  
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
      <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4">
        <CardTitle className="text-white flex items-center font-poppins text-lg sm:text-xl">
          <Cpu className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-revithalize-blue" />
          IoT System Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="space-y-2 sm:space-y-3 animate-fade-in">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <ThermometerSnowflake className="h-3 w-3 sm:h-4 sm:w-4 text-revithalize-green" />
              <span className="text-xs sm:text-sm text-white font-poppins">Cooling System</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white font-poppins">92%</span>
          </div>
          <div className="relative h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
            <Progress value={92} className="absolute inset-0 bg-gradient-to-r from-revithalize-green to-revithalize-blue transition-all duration-1000" />
          </div>
        </div>
        
        <div className="space-y-2 sm:space-y-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <Gauge className="h-3 w-3 sm:h-4 sm:w-4 text-revithalize-blue" />
              <span className="text-xs sm:text-sm text-white font-poppins">Power Systems</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white font-poppins">85%</span>
          </div>
          <div className="relative h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
            <Progress value={85} className="absolute inset-0 bg-gradient-to-r from-revithalize-blue to-revithalize-green transition-all duration-1000" />
          </div>
        </div>
        
        <div className="space-y-2 sm:space-y-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 sm:gap-2">
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
              <span className="text-xs sm:text-sm text-white font-poppins">Battery Health</span>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-white font-poppins">78%</span>
          </div>
          <div className="relative h-1.5 sm:h-2 bg-gray-800 rounded-full overflow-hidden">
            <Progress value={78} className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-revithalize-green transition-all duration-1000" />
          </div>
        </div>
        
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="bg-gray-800/70 rounded-lg p-3 sm:p-4 border-l-4 border-yellow-500 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-800">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium font-poppins text-sm sm:text-base">Maintenance Alert</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 font-poppins">Cooling system will need service in approximately 14 days</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/70 rounded-lg p-3 sm:p-4 border-l-4 border-revithalize-green shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-800 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-start gap-2 sm:gap-3">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-revithalize-green mt-0.5" />
              <div>
                <h4 className="text-white font-medium font-poppins text-sm sm:text-base">System Update</h4>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 font-poppins">Software update v2.4 available for your vehicle</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
