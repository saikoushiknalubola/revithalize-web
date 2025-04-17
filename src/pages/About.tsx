
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Zap, Users, Building, Leaf, LightBulb } from 'lucide-react';

export default function About() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">About ReVithalize</h1>
          <p className="text-gray-400 mt-1">Our vision, mission and journey</p>
        </header>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <LightBulb className="mr-2 h-5 w-5 text-revithalize-green" />
              Our Story
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <p>
              ReVithalize was born from a simple yet powerful idea in early 2024 — "What if we could bring old fuel-powered bikes back to life, sustainably?" Inspired by a conversation with family, Founder Nalubola Saikoushik decided to take on India's two-wheeler pollution challenge through innovation, passion, and purpose.
            </p>
            <p>
              ReVithalize is an EV retrofitting startup that transforms internal combustion engine (ICE) two-wheelers into affordable, smart electric vehicles, using modular AI-powered conversion kits. Our solution enables common users to shift to electric mobility without having to buy a new vehicle — saving costs, reducing e-waste, and cutting down carbon emissions.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-2 h-5 w-5 text-revithalize-green" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                At ReVithalize, our mission is to revive, reimagine, and revolutionize mobility for a cleaner tomorrow. We aim to decentralize electrification by partnering with local mechanics, training EV technicians, and building a network of certified retrofit centers across India.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start">
                  <div className="bg-revithalize-green/20 p-2 rounded-full mr-3">
                    <Leaf className="h-5 w-5 text-revithalize-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Sustainable Transportation</h3>
                    <p className="text-sm text-gray-400">Accelerating India's transition to net-zero transportation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-revithalize-green/20 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-revithalize-green" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Community Empowerment</h3>
                    <p className="text-sm text-gray-400">Creating green jobs and empowering local communities</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="mr-2 h-5 w-5 text-revithalize-green" />
                Recognition & Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                We're backed by prestigious organizations that support our vision for sustainable mobility:
              </p>
              <div className="space-y-3">
                <div className="bg-gray-800/70 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-revithalize-green mr-2" />
                    <h3 className="font-medium text-white">T-Hub & Mercedes-Benz R&D India (MBRDI)</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Support through their Climate Tech Incubator program</p>
                </div>
                <div className="bg-gray-800/70 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-revithalize-green mr-2" />
                    <h3 className="font-medium text-white">IIT Bombay</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Technical innovation recognition</p>
                </div>
                <div className="bg-gray-800/70 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-revithalize-green mr-2" />
                    <h3 className="font-medium text-white">IIIT Tirupati iHub Navavishkar</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Research and development partnership</p>
                </div>
                <div className="bg-gray-800/70 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-revithalize-green mr-2" />
                    <h3 className="font-medium text-white">IIT Madras Research Park</h3>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Technology validation and testing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              We envision a future where every petrol bike has the potential to become electric — empowering communities, creating green jobs, and accelerating India's transition to net-zero transportation. Our modular retrofit kits make electric mobility accessible to all, creating a sustainable ecosystem for the future of transportation in India.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-3">
                  <Zap className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="font-medium text-white mb-1">45,000+</h3>
                <p className="text-sm text-gray-400">Retrofitted vehicles by 2025</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-3">
                  <Users className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="font-medium text-white mb-1">500+</h3>
                <p className="text-sm text-gray-400">Certified technicians</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="bg-revithalize-green/20 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-3">
                  <Leaf className="h-8 w-8 text-revithalize-green" />
                </div>
                <h3 className="font-medium text-white mb-1">30,000+</h3>
                <p className="text-sm text-gray-400">Tons of CO₂ reduction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
