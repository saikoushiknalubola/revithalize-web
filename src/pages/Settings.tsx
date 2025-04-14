
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, Lock, Eye, BellOff, Zap, Battery, Moon, Sun, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [powerSaving, setPowerSaving] = useState(false);
  const [autoCharge, setAutoCharge] = useState(true);
  
  const handleToggleChange = (setting: string, value: boolean) => {
    switch(setting) {
      case 'notifications':
        setNotifications(value);
        toast.success(`Notifications ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'darkMode':
        setDarkMode(value);
        toast.success(`Dark mode ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'locationTracking':
        setLocationTracking(value);
        toast.success(`Location tracking ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'powerSaving':
        setPowerSaving(value);
        toast.success(`Power saving mode ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'autoCharge':
        setAutoCharge(value);
        toast.success(`Auto charging ${value ? 'enabled' : 'disabled'}`);
        break;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-6">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your application preferences</p>
        </header>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="w-full bg-gray-900 p-1 overflow-x-auto flex md:flex-wrap">
            <TabsTrigger 
              value="general"
              className="flex-1 min-w-[100px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex-1 min-w-[100px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="privacy" 
              className="flex-1 min-w-[100px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              Privacy
            </TabsTrigger>
            <TabsTrigger 
              value="display" 
              className="flex-1 min-w-[100px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              Display
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-revithalize-green" />
                  Power Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Power Saving Mode</div>
                    <div className="text-gray-400 text-sm">Extends battery life by reducing performance</div>
                  </div>
                  <Switch 
                    checked={powerSaving}
                    onCheckedChange={(checked) => handleToggleChange('powerSaving', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Automatic Charging</div>
                    <div className="text-gray-400 text-sm">Schedule charging during off-peak hours</div>
                  </div>
                  <Switch 
                    checked={autoCharge}
                    onCheckedChange={(checked) => handleToggleChange('autoCharge', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Smartphone className="mr-2 h-5 w-5 text-revithalize-blue" />
                  Mobile App Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Background Refresh</div>
                    <div className="text-gray-400 text-sm">Update data when app is in background</div>
                  </div>
                  <Switch 
                    defaultChecked
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-yellow-400" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Push Notifications</div>
                    <div className="text-gray-400 text-sm">Receive alerts on your device</div>
                  </div>
                  <Switch 
                    checked={notifications}
                    onCheckedChange={(checked) => handleToggleChange('notifications', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Battery Alerts</div>
                    <div className="text-gray-400 text-sm">Get notifications when battery is low or fully charged</div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Maintenance Reminders</div>
                    <div className="text-gray-400 text-sm">Receive service and maintenance notifications</div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lock className="mr-2 h-5 w-5 text-red-400" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Location Tracking</div>
                    <div className="text-gray-400 text-sm">Allow app to access your location</div>
                  </div>
                  <Switch 
                    checked={locationTracking}
                    onCheckedChange={(checked) => handleToggleChange('locationTracking', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Data Sharing</div>
                    <div className="text-gray-400 text-sm">Share anonymous usage data to improve services</div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="mr-2 h-5 w-5 text-revithalize-blue" />
                  Display Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Dark Mode</div>
                    <div className="text-gray-400 text-sm">Switch between light and dark themes</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun size={18} className="text-yellow-400" />
                    <Switch 
                      checked={darkMode}
                      onCheckedChange={(checked) => handleToggleChange('darkMode', checked)} 
                      className="data-[state=checked]:bg-revithalize-green"
                    />
                    <Moon size={18} className="text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
