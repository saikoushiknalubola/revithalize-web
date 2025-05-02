
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, Lock, Eye, BellOff, Zap, Battery, 
  Moon, Sun, Smartphone, Shield, CloudRain, Wallet, 
  CreditCard, AlarmClock, Bluetooth, Settings as SettingsIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';

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
  const isMobile = useIsMobile();
  
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
      <div className="container mx-auto space-y-6 p-4 md:p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white font-poppins flex items-center gap-2">
            <SettingsIcon className="h-7 w-7 text-revithalize-green" />
            Settings
          </h1>
          <p className="text-gray-400 mt-1 font-poppins">Manage your application preferences</p>
        </header>

        <Tabs defaultValue="general" className="space-y-6">
          {/* Improved responsive TabsList */}
          <div className="overflow-x-auto pb-2 -mb-2">
            <TabsList className="bg-gray-900 p-1 inline-flex min-w-full md:w-full">
              <TabsTrigger 
                value="general"
                className="flex-1 min-w-[100px] font-poppins data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
              >
                General
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="flex-1 min-w-[100px] font-poppins data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="flex-1 min-w-[100px] font-poppins data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
              >
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="display" 
                className="flex-1 min-w-[100px] font-poppins data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
              >
                Display
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                className="flex-1 min-w-[100px] font-poppins data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
              >
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-poppins">
                  <Zap className="mr-2 h-5 w-5 text-revithalize-green" />
                  Power Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Power Saving Mode</div>
                    <div className="text-gray-400 text-sm font-poppins">Extends battery life by reducing performance</div>
                  </div>
                  <Switch 
                    checked={powerSaving}
                    onCheckedChange={(checked) => handleToggleChange('powerSaving', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Automatic Charging</div>
                    <div className="text-gray-400 text-sm font-poppins">Schedule charging during off-peak hours</div>
                  </div>
                  <Switch 
                    checked={autoCharge}
                    onCheckedChange={(checked) => handleToggleChange('autoCharge', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="mt-6 border-t border-gray-800 pt-4">
                  <h3 className="text-white mb-3 font-poppins">Battery Operating Mode</h3>
                  <RadioGroup 
                    value={batteryMode} 
                    onValueChange={handleBatteryModeChange}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eco" id="eco" />
                      <Label htmlFor="eco" className="text-gray-300 font-poppins">Eco Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="balanced" id="balanced" />
                      <Label htmlFor="balanced" className="text-gray-300 font-poppins">Balanced</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="performance" id="performance" />
                      <Label htmlFor="performance" className="text-gray-300 font-poppins">Performance</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
            
            <ChargingScheduler />
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center font-poppins">
                  <Smartphone className="mr-2 h-5 w-5 text-revithalize-blue" />
                  Mobile App Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Background Refresh</div>
                    <div className="text-gray-400 text-sm font-poppins">Update data when app is in background</div>
                  </div>
                  <Switch 
                    defaultChecked
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Bluetooth Connection</div>
                    <div className="text-gray-400 text-sm font-poppins">Connect to vehicle via Bluetooth</div>
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
                <CardTitle className="text-white flex items-center font-poppins">
                  <Bell className="mr-2 h-5 w-5 text-yellow-400" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Push Notifications</div>
                    <div className="text-gray-400 text-sm font-poppins">Receive alerts on your device</div>
                  </div>
                  <Switch 
                    checked={notifications}
                    onCheckedChange={(checked) => handleToggleChange('notifications', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Battery Alerts</div>
                    <div className="text-gray-400 text-sm font-poppins">Get notifications when battery is low or fully charged</div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Maintenance Reminders</div>
                    <div className="text-gray-400 text-sm font-poppins">Receive service and maintenance notifications</div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Weather Alerts</div>
                    <div className="text-gray-400 text-sm font-poppins">Receive alerts about weather affecting charging</div>
                  </div>
                  <Switch 
                    checked={weatherAlerts}
                    onCheckedChange={(checked) => handleToggleChange('weatherAlerts', checked)}
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Payment Notifications</div>
                    <div className="text-gray-400 text-sm font-poppins">Notifications about billing and payments</div>
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
                <CardTitle className="text-white flex items-center font-poppins">
                  <Lock className="mr-2 h-5 w-5 text-red-400" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Location Tracking</div>
                    <div className="text-gray-400 text-sm font-poppins">Allow app to access your location</div>
                  </div>
                  <Switch 
                    checked={locationTracking}
                    onCheckedChange={(checked) => handleToggleChange('locationTracking', checked)} 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Data Sharing</div>
                    <div className="text-gray-400 text-sm font-poppins">Share anonymous usage data to improve services</div>
                  </div>
                  <Switch 
                    defaultChecked 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="mt-6 border-t border-gray-800 pt-4">
                  <h3 className="text-white mb-3 font-poppins">Data Collection</h3>
                  <div className="space-y-3">
                    <div className="flex items-top space-x-2">
                      <Checkbox id="analytics" defaultChecked/>
                      <div className="grid gap-1.5">
                        <Label htmlFor="analytics" className="text-gray-300 font-poppins">Analytics</Label>
                        <p className="text-gray-400 text-xs font-poppins">Share usage statistics to help improve the app</p>
                      </div>
                    </div>
                    <div className="flex items-top space-x-2">
                      <Checkbox id="crash-reports" defaultChecked/>
                      <div className="grid gap-1.5">
                        <Label htmlFor="crash-reports" className="text-gray-300 font-poppins">Crash Reports</Label>
                        <p className="text-gray-400 text-xs font-poppins">Send diagnostic information when the app crashes</p>
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
                <CardTitle className="text-white flex items-center font-poppins">
                  <Eye className="mr-2 h-5 w-5 text-revithalize-blue" />
                  Display Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Dark Mode</div>
                    <div className="text-gray-400 text-sm font-poppins">Switch between light and dark themes</div>
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
                <CardTitle className="text-white flex items-center font-poppins">
                  <Shield className="mr-2 h-5 w-5 text-purple-400" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Developer Mode</div>
                    <div className="text-gray-400 text-sm font-poppins">Enable additional debugging features</div>
                  </div>
                  <Switch 
                    className="data-[state=checked]:bg-revithalize-green"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-poppins">Reset All Settings</div>
                    <div className="text-gray-400 text-sm font-poppins">Restore all settings to default values</div>
                  </div>
                  <button 
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 font-poppins"
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
