import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, Zap, Users, Building, Leaf, Lightbulb, Activity, ChevronRight, Wrench, Battery, MessageSquare, ExternalLink, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  const handleSubmitTicket = () => {
    toast.success('Support ticket submitted', {
      description: 'We will get back to you within 24 hours'
    });
    navigate('/support');
  };

  const handleVisitWebsite = () => {
    window.open('https://revithalize.odoo.com/', '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-8">
        <header className="relative overflow-hidden rounded-lg bg-gradient-to-br from-revithalize-dark to-gray-900 p-8">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2 animate-fade-in">About ReVithalize</h1>
            <p className="text-gray-300 text-lg animate-fade-in delay-100">Revolutionizing sustainable mobility in India</p>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <Activity className="w-full h-full text-revithalize-green" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:shadow-lg transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-revithalize-green" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-300">
              <div className="p-4 bg-black/20 rounded-lg border border-gray-800">
                <p className="mb-3">
                  Founded in early 2024, ReVithalize emerged from a visionary conversation about transforming India's two-wheeler landscape. Our founder, Nalubola Saikoushik, recognized the urgent need to address urban pollution while making electric mobility accessible to all.
                </p>
                <p>
                  We specialize in converting existing ICE two-wheelers into smart electric vehicles using our innovative AI-powered retrofit kits, making sustainable transportation affordable and practical for everyone.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:shadow-lg transition-all duration-300 animate-fade-in delay-100">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-revithalize-green" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">
                  ReVithalize aims to accelerate India's transition to sustainable mobility by making electric vehicle conversion accessible, affordable, and reliable for everyone.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                    <div className="flex items-center mb-2">
                      <div className="bg-revithalize-green/20 p-2 rounded-full">
                        <Leaf className="h-5 w-5 text-revithalize-green" />
                      </div>
                      <h3 className="ml-3 font-medium text-white">Sustainability</h3>
                    </div>
                    <p className="text-sm text-gray-400">Reducing carbon emissions through smart EV conversions</p>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                    <div className="flex items-center mb-2">
                      <div className="bg-revithalize-green/20 p-2 rounded-full">
                        <Users className="h-5 w-5 text-revithalize-green" />
                      </div>
                      <h3 className="ml-3 font-medium text-white">Community</h3>
                    </div>
                    <p className="text-sm text-gray-400">Creating green jobs and empowering local mechanics</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:shadow-lg transition-all duration-300 animate-fade-in delay-200">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="mr-2 h-5 w-5 text-revithalize-green" />
              Core Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 hover:border-revithalize-green/50 transition-all duration-300">
                <div className="bg-revithalize-green/20 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                  <Battery className="h-6 w-6 text-revithalize-green" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Smart EV Conversion</h3>
                <p className="text-gray-400">AI-powered retrofit kits transforming conventional two-wheelers into smart electric vehicles.</p>
              </div>
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 hover:border-revithalize-green/50 transition-all duration-300">
                <div className="bg-revithalize-green/20 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                  <Wrench className="h-6 w-6 text-revithalize-green" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Expert Installation</h3>
                <p className="text-gray-400">Professional retrofitting services through our network of certified mechanics and technicians.</p>
              </div>
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 hover:border-revithalize-green/50 transition-all duration-300">
                <div className="bg-revithalize-green/20 h-12 w-12 flex items-center justify-center rounded-full mb-4">
                  <Activity className="h-6 w-6 text-revithalize-green" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Real-time Monitoring</h3>
                <p className="text-gray-400">Advanced IoT-based monitoring system for vehicle performance and battery health tracking.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:shadow-lg transition-all duration-300 animate-fade-in delay-300">
          <CardHeader>
            <CardTitle className="text-white">Impact Goals 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 text-center">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Zap className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">First Achievement</h3>
                <p className="text-gray-400">Successfully launched our first AI-powered EV conversion kit, implemented in pilot vehicles</p>
              </div>
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 text-center opacity-70">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Activity className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Next Milestone</h3>
                <p className="text-gray-400">Development in progress: Enhanced monitoring system with predictive maintenance</p>
                <span className="inline-block mt-2 text-sm text-revithalize-green">Coming Soon</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Building className="mr-2 h-5 w-5 text-revithalize-green" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-revithalize-green flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Corporate Headquarters</p>
                    <p className="text-gray-400">ReVithalize Innovations</p>
                    <p className="text-gray-400">Warangal, Telangana 506001</p>
                    <p className="text-gray-400">Bharat (India)</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5 text-revithalize-green" />
                    <div>
                      <p className="text-white font-medium">Phone</p>
                      <p className="text-gray-400">+91 7032165635</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5 text-revithalize-green" />
                    <div>
                      <p className="text-white font-medium">Email</p>
                      <p className="text-gray-400">revithalize@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button 
                  onClick={handleSubmitTicket}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all group"
                >
                  <MessageSquare className="h-5 w-5 text-revithalize-green" />
                  <span>Submit Ticket</span>
                  <ChevronRight className="h-4 w-4 text-revithalize-green group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={handleVisitWebsite}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all group"
                >
                  <Globe className="h-5 w-5 text-revithalize-green" />
                  <span>Visit Website</span>
                  <ExternalLink className="h-4 w-4 text-revithalize-green group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
