
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Calendar, Settings, Shield, Bell } from 'lucide-react';

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">Your Profile</h1>
          <p className="text-gray-400 mt-1">Manage your account and preferences</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-1 bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">User Information</CardTitle>
              <CardDescription className="text-gray-400">Your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-revithalize-dark flex items-center justify-center mb-4">
                  <User size={48} className="text-revithalize-green" />
                </div>
                <h3 className="text-xl font-medium text-white">Alex Johnson</h3>
                <p className="text-gray-400">EV Enthusiast</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">alex.johnson@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white">+91 9876 543 210</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-800">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">Hyderabad, Telangana</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="text-white">March 2023</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 bg-revithalize-dark hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Edit Profile
              </button>
            </CardContent>
          </Card>

          {/* Settings and Preferences */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-revithalize-green" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      title: "Notification Preferences", 
                      description: "Manage how you receive alerts and updates", 
                      icon: Bell 
                    },
                    { 
                      title: "Privacy & Security", 
                      description: "Control your data and account security settings", 
                      icon: Shield 
                    },
                    { 
                      title: "App Preferences", 
                      description: "Customize your experience and display settings", 
                      icon: Settings 
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-700 rounded-md">
                            <Icon size={16} className="text-revithalize-green" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                          </div>
                        </div>
                        <button className="text-sm text-revithalize-green hover:text-green-400 transition-colors">
                          Configure
                        </button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Vehicle Information</CardTitle>
                <CardDescription className="text-gray-400">Your EV's details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Vehicle Model</p>
                      <p className="text-white font-medium">RevithaEV Pro X</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Registration</p>
                      <p className="text-white font-medium">TS 12 AB 3456</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Purchase Date</p>
                      <p className="text-white font-medium">June 2023</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Warranty Until</p>
                      <p className="text-white font-medium">June 2028</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-2">Battery Warranty Status</p>
                    <div className="flex items-center">
                      <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden mr-3">
                        <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{ width: '92%' }} />
                      </div>
                      <span className="text-white font-medium">92%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">58 months remaining</p>
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
