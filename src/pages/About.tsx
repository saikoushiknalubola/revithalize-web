
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Zap, Users, Building, Leaf, Lightbulb, Activity, ChevronRight } from 'lucide-react';

export default function About() {
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
              Recognition & Partnerships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "T-Hub & MBRDI",
                  desc: "Climate Tech Incubator Program Support"
                },
                {
                  title: "IIT Bombay",
                  desc: "Technical Innovation Recognition"
                },
                {
                  title: "IIIT Tirupati",
                  desc: "Research Partnership"
                },
                {
                  title: "IIT Madras",
                  desc: "Technology Validation"
                }
              ].map((item, index) => (
                <div key={index} className="group bg-black/20 p-4 rounded-lg border border-gray-800 hover:border-revithalize-green/50 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <Building className="h-5 w-5 text-revithalize-green" />
                    <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-revithalize-green transition-colors" />
                  </div>
                  <h3 className="mt-3 font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:shadow-lg transition-all duration-300 animate-fade-in delay-300">
          <CardHeader>
            <CardTitle className="text-white">Impact Goals 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 text-center">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Zap className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">45,000+</h3>
                <p className="text-gray-400">EV Conversions</p>
              </div>
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 text-center">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Users className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
                <p className="text-gray-400">Certified Technicians</p>
              </div>
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 text-center">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">30,000+</h3>
                <p className="text-gray-400">Tons CO₂ Reduction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
