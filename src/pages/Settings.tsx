
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, User, Shield, Bell, Globe, Battery, Moon, Sun, LayoutDashboard } from 'lucide-react';

export default function Settings() {
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
                  { title: "Account", icon: User, active: false },
                  { title: "Appearance", icon: Moon, active: true },
                  { title: "Dashboard", icon: LayoutDashboard, active: false },
                  { title: "Notifications", icon: Bell, active: false },
                  { title: "Privacy", icon: Shield, active: false },
                  { title: "Language", icon: Globe, active: false },
                  { title: "Vehicle", icon: Battery, active: false },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={index} 
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        item.active 
                          ? 'bg-revithalize-dark text-revithalize-green' 
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon size={18} className={item.active ? 'text-revithalize-green' : ''} />
                      <span>{item.title}</span>
                      {item.active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-revithalize-green"></span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <div className="lg:col-span-2 space-y-6">
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
                        { name: "System", icon: SettingsIcon, active: false },
                        { name: "Dark", icon: Moon, active: true },
                        { name: "Light", icon: Sun, active: false },
                      ].map((theme, index) => {
                        const Icon = theme.icon;
                        return (
                          <div
                            key={index}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border ${
                              theme.active 
                                ? 'border-revithalize-green bg-gray-800' 
                                : 'border-gray-800 bg-gray-800/50 hover:bg-gray-800'
                            }`}
                          >
                            <Icon 
                              size={24} 
                              className={`mb-2 ${theme.active ? 'text-revithalize-green' : 'text-gray-400'}`} 
                            />
                            <span className={theme.active ? 'text-white' : 'text-gray-400'}>
                              {theme.name}
                            </span>
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
                        { color: 'bg-revithalize-green', active: true },
                        { color: 'bg-blue-500', active: false },
                        { color: 'bg-purple-500', active: false },
                        { color: 'bg-red-500', active: false },
                        { color: 'bg-orange-500', active: false },
                        { color: 'bg-pink-500', active: false },
                      ].map((item, index) => (
                        <div key={index} className="relative">
                          <div
                            className={`h-8 w-8 rounded-full cursor-pointer ${item.color} ${
                              item.active ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                            }`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Layout Density */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Layout Density</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['Compact', 'Default', 'Comfortable'].map((density, index) => (
                        <div
                          key={index}
                          className={`text-center p-3 rounded-lg cursor-pointer border ${
                            density === 'Default' 
                              ? 'border-revithalize-green bg-gray-800' 
                              : 'border-gray-800 bg-gray-800/50 hover:bg-gray-800'
                          }`}
                        >
                          <span className={density === 'Default' ? 'text-white' : 'text-gray-400'}>
                            {density}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="bg-revithalize-green hover:bg-green-600 text-black font-medium py-2 px-4 rounded-lg transition-colors">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
