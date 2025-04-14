
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, Lock, Eye, BellOff, Zap, Battery, 
  Moon, Sun, Smartphone, Shield, CloudRain, Wallet, 
  CreditCard, AlarmClock, Bluetooth
} from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function Settings() {
  // State for settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [powerSaving, setPowerSaving] = useState(false);
  const [autoCharge, setAutoCharge] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);
  const [batteryMode, setBatteryMode] = useState('balanced');
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  
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
      case 'weatherAlerts':
        setWeatherAlerts(value);
        toast.success(`Weather alerts ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'paymentNotifications':
        setPaymentNotifications(value);
        toast.success(`Payment notifications ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'bluetoothEnabled':
        setBluetoothEnabled(value);
        toast.success(`Bluetooth ${value ? 'enabled' : 'disabled'}`);
        break;
    }
  };

  const handleBatteryModeChange = (value: string) => {
    setBatteryMode(value);
    toast.success(`Battery mode changed to ${value}`);
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
            <TabsTrigger 
              value="advanced" 
              className="flex-1 min-w-[100px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              Advanced
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

                <div className="mt-6 border-t border-gray-800 pt-4">
                  <h3 className="text-white mb-3">Battery Operating Mode</h3>
                  <RadioGroup 
                    value={batteryMode} 
                    onValueChange={handleBatteryModeChange}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eco" id="eco" />
                      <Label htmlFor="eco" className="text-gray-300">Eco Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balanced" id="balanced" />
                      <Label htmlFor="balanced" className="text-gray-300">Balanced</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="performance" id="performance" />
                      <Label htmlFor="performance" className="text-gray-300">Performance</Label>
                    </div>
                  </RadioGroup>
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

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Bluetooth Connection</div>
                    <div className="text-gray-400 text-sm">Connect to vehicle via Bluetooth</div>
                  </div>
                  <Switch 
                    checked={bluetoothEnabled}
                    onCheckedChange={(checked) => handleToggleChange('bluetoothEnabled', checked)}
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

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Weather Alerts</div>
                    <div className="text-gray-400 text-sm">Receive alerts about weather affecting charging</div>
                  </div>
                  <Switch 
                    checked={weatherAlerts}
                    onCheckedChange={(checked) => handleToggleChange('weatherAlerts', checked)}
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Payment Notifications</div>
                    <div className="text-gray-400 text-sm">Notifications about billing and payments</div>
                  </div>
                  <Switch 
                    checked={paymentNotifications}
                    onCheckedChange={(checked) => handleToggleChange('paymentNotifications', checked)}
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

                <div className="mt-6 border-t border-gray-800 pt-4">
                  <h3 className="text-white mb-3">Data Collection</h3>
                  <div className="space-y-3">
                    <div className="flex items-top space-x-2">
                      <Checkbox id="analytics" defaultChecked/>
                      <div className="grid gap-1.5">
                        <Label htmlFor="analytics" className="text-gray-300">Analytics</Label>
                        <p className="text-gray-400 text-xs">Share usage statistics to help improve the app</p>
                      </div>
                    </div>
                    <div className="flex items-top space-x-2">
                      <Checkbox id="crash-reports" defaultChecked/>
                      <div className="grid gap-1.5">
                        <Label htmlFor="crash-reports" className="text-gray-300">Crash Reports</Label>
                        <p className="text-gray-400 text-xs">Send diagnostic information when the app crashes</p>
                      </div>
                    </div>
                  </div>
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

          <TabsContent value="advanced" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-purple-400" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Developer Mode</div>
                    <div className="text-gray-400 text-sm">Enable additional debugging features</div>
                  </div>
                  <Switch 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white">Reset All Settings</div>
                    <div className="text-gray-400 text-sm">Restore all settings to default values</div>
                  </div>
                  <button 
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                    onClick={() => toast.info("This would reset all settings to defaults")}
                  >
                    Reset
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
