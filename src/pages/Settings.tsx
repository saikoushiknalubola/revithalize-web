
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Battery, 
  Moon, 
  Sun, 
  LayoutDashboard,
  Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Appearance');
  const [theme, setTheme] = useState('Dark');
  const [accentColor, setAccentColor] = useState('green');
  const [density, setDensity] = useState('Default');
  const [notifications, setNotifications] = useState({
    appUpdates: true,
    batteryAlerts: true,
    chargingComplete: true,
    weeklyReports: false
  });

  const savePreferences = () => {
    toast.success('Settings saved successfully!');
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    // In a real app, you would actually change the theme here
  };

  const handleColorChange = (color: string) => {
    setAccentColor(color);
    // In a real app, you would actually change the accent color here
  };

  const handleDensityChange = (newDensity: string) => {
    setDensity(newDensity);
    // In a real app, you would adjust the UI density
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'Appearance':
        return (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Moon className="mr-2 h-5 w-5 text-revithalize-green" />
                Appearance
              </CardTitle>
              <CardDescription className="text-gray-400">
                Customize how the application looks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Theme Selection */}
                <div>
                  <h3 className="text-white font-medium mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: "System", icon: SettingsIcon },
                      { name: "Dark", icon: Moon },
                      { name: "Light", icon: Sun },
                    ].map((themeOption) => {
                      const Icon = themeOption.icon;
                      const isActive = theme === themeOption.name;
                      return (
                        <div
                          key={themeOption.name}
                          className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border transition-all ${
                            isActive 
                              ? 'border-revithalize-green bg-gray-800' 
                              : 'border-gray-800 bg-gray-800/50 hover:bg-gray-800'
                          }`}
                          onClick={() => handleThemeChange(themeOption.name)}
                        >
                          <Icon 
                            size={24} 
                            className={`mb-2 ${isActive ? 'text-revithalize-green' : 'text-gray-400'}`} 
                          />
                          <span className={isActive ? 'text-white' : 'text-gray-400'}>
                            {themeOption.name}
                          </span>
                          {isActive && (
                            <div className="absolute top-2 right-2">
                              <Check size={16} className="text-revithalize-green" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Color Accents */}
                <div>
                  <h3 className="text-white font-medium mb-3">Accent Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { color: 'bg-revithalize-green', name: 'green' },
                      { color: 'bg-blue-500', name: 'blue' },
                      { color: 'bg-purple-500', name: 'purple' },
                      { color: 'bg-red-500', name: 'red' },
                      { color: 'bg-orange-500', name: 'orange' },
                      { color: 'bg-pink-500', name: 'pink' },
                    ].map((item) => (
                      <div key={item.name} className="relative">
                        <div
                          onClick={() => handleColorChange(item.name)}
                          className={`h-8 w-8 rounded-full cursor-pointer ${item.color} ${
                            accentColor === item.name ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                          }`}
                        >
                          {accentColor === item.name && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layout Density */}
                <div>
                  <h3 className="text-white font-medium mb-3">Layout Density</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['Compact', 'Default', 'Comfortable'].map((densityOption) => (
                      <div
                        key={densityOption}
                        onClick={() => handleDensityChange(densityOption)}
                        className={`text-center p-3 rounded-lg cursor-pointer border transition-colors ${
                          density === densityOption 
                            ? 'border-revithalize-green bg-gray-800' 
                            : 'border-gray-800 bg-gray-800/50 hover:bg-gray-800'
                        }`}
                      >
                        <span className={density === densityOption ? 'text-white' : 'text-gray-400'}>
                          {densityOption}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={savePreferences} className="bg-revithalize-green hover:bg-green-600 text-black font-medium transition-colors">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'Notifications':
        return (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="mr-2 h-5 w-5 text-revithalize-green" />
                Notifications
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure app notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'appUpdates', label: 'App Updates', description: 'Get notified about new features and improvements' },
                  { id: 'batteryAlerts', label: 'Battery Alerts', description: 'Receive alerts when battery is low or needs attention' },
                  { id: 'chargingComplete', label: 'Charging Complete', description: 'Get notified when vehicle charging is complete' },
                  { id: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly usage and efficiency reports' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-800">
                    <div>
                      <h4 className="text-white font-medium">{item.label}</h4>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.id as keyof typeof notifications]}
                      onCheckedChange={(checked) => {
                        setNotifications({
                          ...notifications,
                          [item.id]: checked
                        });
                      }}
                      className="data-[state=checked]:bg-revithalize-green"
                    />
                  </div>
                ))}
                
                <div className="flex justify-end pt-4">
                  <Button onClick={savePreferences} className="bg-revithalize-green hover:bg-green-600 text-black font-medium transition-colors">
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {activeTab}
              </CardTitle>
              <CardDescription className="text-gray-400">
                This section is under development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <div className="mb-4 bg-gray-800 h-32 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Coming soon</p>
                </div>
                <p className="text-gray-300">We're working on this feature and it will be available soon.</p>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Configure your app preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <Card className="lg:col-span-1 bg-gray-900 border-gray-800 h-fit">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                {[
                  { title: "Account", icon: User },
                  { title: "Appearance", icon: Moon },
                  { title: "Dashboard", icon: LayoutDashboard },
                  { title: "Notifications", icon: Bell },
                  { title: "Privacy", icon: Shield },
                  { title: "Language", icon: Globe },
                  { title: "Vehicle", icon: Battery },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.title;
                  return (
                    <button 
                      key={item.title} 
                      onClick={() => setActiveTab(item.title)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-revithalize-dark text-revithalize-green' 
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon size={18} className={isActive ? 'text-revithalize-green' : ''} />
                      <span>{item.title}</span>
                      {isActive && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-revithalize-green"></span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Dynamic Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
