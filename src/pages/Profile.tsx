
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, Edit, LogOut, Battery, Car } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const handleEditProfile = () => {
    toast.info('Edit profile functionality coming soon!');
  };

  const handleLogout = () => {
    toast.info('Logout functionality coming soon!');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">My Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account and preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 bg-gray-900 border-gray-800">
            <CardHeader className="pb-2 text-center">
              <div className="mx-auto mb-4 relative">
                <div className="w-24 h-24 bg-gradient-to-br from-revithalize-green to-revithalize-blue rounded-full flex items-center justify-center text-black text-3xl font-bold">
                  RS
                </div>
                <button 
                  className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full border border-gray-700 hover:bg-gray-700 transition-colors"
                  onClick={handleEditProfile}
                >
                  <Edit size={14} className="text-white" />
                </button>
              </div>
              <CardTitle className="text-white text-xl">Rajesh Sharma</CardTitle>
              <p className="text-gray-400">EV Enthusiast</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={16} className="text-revithalize-green" />
                  <span>rajesh.sharma@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={16} className="text-revithalize-green" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={16} className="text-revithalize-green" />
                  <span>Delhi, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar size={16} className="text-revithalize-green" />
                  <span>Member since May 2023</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 flex justify-center">
              <Button 
                variant="outline" 
                className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </Button>
            </CardFooter>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Information */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Car className="mr-2 h-5 w-5 text-revithalize-green" />
                  My Vehicles
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your connected electric vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-revithalize-green/50 transition-colors cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3 mb-3 md:mb-0">
                      <div className="w-12 h-12 bg-revithalize-dark rounded-lg flex items-center justify-center">
                        <Battery className="h-6 w-6 text-revithalize-green" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Tata Nexon EV</h3>
                        <p className="text-sm text-gray-400">Added May 15, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-900 px-3 py-1 rounded-full text-xs text-white">
                        75% Charged
                      </div>
                      <div className="bg-revithalize-green/20 text-revithalize-green px-3 py-1 rounded-full text-xs">
                        Active
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="border-dashed border-gray-700 hover:border-revithalize-green hover:bg-gray-800">
                    <span className="mr-2 text-lg">+</span> Add New Vehicle
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Usage Statistics</CardTitle>
                <CardDescription className="text-gray-400">
                  Your EV usage over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Total Distance</p>
                    <p className="text-2xl font-bold text-white">437 km</p>
                    <div className="mt-2 text-xs text-green-400 flex items-center">
                      <span className="mr-1">↑</span> 12% from last month
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Energy Used</p>
                    <p className="text-2xl font-bold text-white">89 kWh</p>
                    <div className="mt-2 text-xs text-red-400 flex items-center">
                      <span className="mr-1">↓</span> 5% from last month
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Charging Sessions</p>
                    <p className="text-2xl font-bold text-white">17</p>
                    <div className="mt-2 text-xs text-green-400 flex items-center">
                      <span className="mr-1">↑</span> 8% from last month
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Button className="bg-revithalize-blue hover:bg-blue-600 text-black">
                    View Detailed Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
