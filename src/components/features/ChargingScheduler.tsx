
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { AlarmClock, Battery, Clock, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useScreenSize } from '@/hooks/use-mobile';

export function ChargingScheduler() {
  const [scheduledCharging, setScheduledCharging] = useState(true);
  const [targetBatteryLevel, setTargetBatteryLevel] = useState([80]);
  const [offPeakOnly, setOffPeakOnly] = useState(true);
  const { isMobile } = useScreenSize();

  const handleScheduledChargingChange = (checked: boolean) => {
    setScheduledCharging(checked);
    toast.success(`Scheduled charging ${checked ? 'enabled' : 'disabled'}`);
  };

  const handleTargetLevelChange = (value: number[]) => {
    setTargetBatteryLevel(value);
  };

  const handleOffPeakChange = (checked: boolean) => {
    setOffPeakOnly(checked);
    toast.success(`Off-peak charging ${checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
      <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4">
        <CardTitle className="text-white flex items-center font-poppins text-lg sm:text-xl">
          <AlarmClock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-revithalize-blue" />
          Charging Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="space-y-0.5">
            <div className="text-white font-poppins text-sm sm:text-base">Scheduled Charging</div>
            <div className="text-gray-400 text-xs sm:text-sm font-poppins">Enable automatic charging schedule</div>
          </div>
          <Switch 
            checked={scheduledCharging}
            onCheckedChange={handleScheduledChargingChange}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-revithalize-green data-[state=checked]:to-revithalize-blue"
          />
        </div>

        {scheduledCharging && (
          <>
            <div className="space-y-3 sm:space-y-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div>
                <Label className="text-white mb-1 sm:mb-2 block font-poppins text-sm sm:text-base">Target Battery Level: {targetBatteryLevel}%</Label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Battery className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <Slider
                    value={targetBatteryLevel}
                    onValueChange={handleTargetLevelChange}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <Battery className="h-4 w-4 sm:h-5 sm:w-5 text-revithalize-green" />
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-1 sm:pt-2 animate-fade-in" style={{ animationDelay: '150ms' }}>
                <div className="space-y-0.5">
                  <div className="text-white font-poppins text-sm sm:text-base">Off-Peak Hours Only</div>
                  <div className="text-gray-400 text-xs sm:text-sm font-poppins">Charge during cheaper electricity hours</div>
                </div>
                <Switch 
                  checked={offPeakOnly}
                  onCheckedChange={handleOffPeakChange}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-revithalize-green data-[state=checked]:to-revithalize-blue"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="bg-gray-800/70 p-2 sm:p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-800">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-revithalize-blue" />
                  <span className="text-white text-xs sm:text-sm font-poppins">Start Time</span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-white font-poppins">11:00 PM</p>
              </div>
              
              <div className="bg-gray-800/70 p-2 sm:p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-gray-800">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-revithalize-green" />
                  <span className="text-white text-xs sm:text-sm font-poppins">Est. Completion</span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-white font-poppins">6:30 AM</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
