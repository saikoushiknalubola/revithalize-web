
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, ThermometerSnowflake, AlertTriangle, Gauge, Activity } from 'lucide-react';

export function IoTInsights() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center font-poppins">
          <Cpu className="mr-2 h-5 w-5 text-revithalize-blue" />
          IoT System Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ThermometerSnowflake className="h-4 w-4 text-revithalize-green" />
              <span className="text-sm text-white font-poppins">Cooling System</span>
            </div>
            <span className="text-sm font-semibold text-white font-poppins">92%</span>
          </div>
          <Progress value={92} className="h-2 bg-gray-800" indicatorClassName="bg-gradient-to-r from-revithalize-green to-revithalize-blue" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-revithalize-blue" />
              <span className="text-sm text-white font-poppins">Power Systems</span>
            </div>
            <span className="text-sm font-semibold text-white font-poppins">85%</span>
          </div>
          <Progress value={85} className="h-2 bg-gray-800" indicatorClassName="bg-gradient-to-r from-revithalize-blue to-revithalize-green" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-yellow-400" />
              <span className="text-sm text-white font-poppins">Battery Health</span>
            </div>
            <span className="text-sm font-semibold text-white font-poppins">78%</span>
          </div>
          <Progress value={78} className="h-2 bg-gray-800" indicatorClassName="bg-gradient-to-r from-yellow-400 to-revithalize-green" />
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium font-poppins">Maintenance Alert</h4>
                <p className="text-gray-400 text-sm mt-1 font-poppins">Cooling system will need service in approximately 14 days</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-revithalize-green">
            <div className="flex items-start gap-3">
              <Cpu className="h-5 w-5 text-revithalize-green mt-0.5" />
              <div>
                <h4 className="text-white font-medium font-poppins">System Update</h4>
                <p className="text-gray-400 text-sm mt-1 font-poppins">Software update v2.4 available for your vehicle</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
