
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Zap, Battery, BellRing, Settings, Plug, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useScreenSize } from '@/hooks/use-mobile';

interface ScheduledCharge {
  id: string;
  day: string;
  time: string;
  targetLevel: number;
  active: boolean;
}

export function ChargingScheduler() {
  const { isMobile } = useScreenSize();
  const [schedules, setSchedules] = useState<ScheduledCharge[]>([
    { id: '1', day: 'Weekdays', time: '22:00 - 05:00', targetLevel: 80, active: true },
    { id: '2', day: 'Weekend', time: '23:00 - 06:00', targetLevel: 90, active: false }
  ]);
  
  const toggleSchedule = (id: string) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === id 
          ? { ...schedule, active: !schedule.active } 
          : schedule
      )
    );
    
    const schedule = schedules.find(s => s.id === id);
    if (schedule) {
      toast.success(
        schedule.active 
          ? `Disabled charging schedule for ${schedule.day}` 
          : `Enabled charging schedule for ${schedule.day}`
      );
    }
  };
  
  const handleAddNewSchedule = () => {
    toast.info('Schedule creator opened', {
      description: 'You can now set up a new charging schedule'
    });
  };

  return (
    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white text-lg sm:text-xl flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-revithalize-blue" />
              Smart Charging Schedule
            </CardTitle>
            <CardDescription className="text-gray-400 text-xs sm:text-sm">Optimize charging times and costs</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddNewSchedule}
            className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200"
          >
            <PlusCircle className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">New</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-revithalize-blue/5 to-revithalize-green/5 pointer-events-none"></div>
        
        {/* Energy rate indicators */}
        <div className="mb-4 p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
          <h3 className="text-sm font-medium text-white mb-3 flex items-center">
            <Zap className="mr-2 h-4 w-4 text-revithalize-green" />
            Current Energy Rates
          </h3>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Peak</p>
              <p className="text-sm font-medium text-white">₹12/kWh</p>
              <p className="text-xs text-red-400">09:00 - 22:00</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Off-Peak</p>
              <p className="text-sm font-medium text-white">₹6/kWh</p>
              <p className="text-xs text-green-400">22:00 - 05:00</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Weekend</p>
              <p className="text-sm font-medium text-white">₹8/kWh</p>
              <p className="text-xs text-yellow-400">All day</p>
            </div>
          </div>
        </div>
        
        {/* Scheduled charges */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white flex items-center">
            <Clock className="mr-2 h-4 w-4 text-revithalize-blue" />
            Your Charging Schedules
          </h3>
          
          {schedules.map((schedule) => (
            <div 
              key={schedule.id}
              className={cn(
                "p-3 rounded-lg border backdrop-blur-sm transition-all duration-300",
                schedule.active 
                  ? "bg-gray-800/60 border-revithalize-green/30" 
                  : "bg-gray-800/30 border-gray-700/30"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center mr-2",
                    schedule.active ? "bg-revithalize-green/20" : "bg-gray-700/50"
                  )}>
                    <Calendar className={cn(
                      "h-3 w-3",
                      schedule.active ? "text-revithalize-green" : "text-gray-400"
                    )} />
                  </div>
                  <span className={cn(
                    "font-medium",
                    schedule.active ? "text-white" : "text-gray-400"
                  )}>{schedule.day}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={schedule.active}
                    onChange={() => toggleSchedule(schedule.id)}
                  />
                  <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-revithalize-green"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                  <span className={schedule.active ? "text-white" : "text-gray-400"}>
                    {schedule.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <Battery className="h-3 w-3 text-gray-400 mr-1" />
                  <span className={schedule.active ? "text-white" : "text-gray-400"}>
                    Target: {schedule.targetLevel}%
                  </span>
                </div>
                <div className="flex items-center">
                  <Plug className="h-3 w-3 text-gray-400 mr-1" />
                  <span className={cn(
                    schedule.active ? "text-green-400" : "text-gray-400"
                  )}>
                    {schedule.active ? "Auto Connect" : "Manual"}
                  </span>
                </div>
                <div className="flex items-center">
                  <BellRing className="h-3 w-3 text-gray-400 mr-1" />
                  <span className={schedule.active ? "text-white" : "text-gray-400"}>
                    Alerts: {schedule.active ? "On" : "Off"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Smart charging info */}
        <div className="mt-4 p-3 bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-700/30 text-xs">
          <div className="flex items-center mb-2">
            <Settings className="h-4 w-4 text-revithalize-blue mr-2" />
            <p className="text-white font-medium">Smart Charging Options</p>
          </div>
          <ul className="space-y-1 text-gray-400 pl-6 list-disc">
            <li>Schedule charges during lowest cost periods</li>
            <li>Set maximum battery levels to extend lifespan</li>
            <li>Weather-adaptive scheduling for optimal efficiency</li>
            <li>Remote override available through mobile app</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
