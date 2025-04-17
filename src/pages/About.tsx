
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Zap, Users, Globe, Award, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useScreenSize } from '@/hooks/use-mobile';

export default function About() {
  const { isMobile } = useScreenSize();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">About Revithalize</h1>
          <p className="text-gray-400 mt-1">Pioneering EV retrofitting solutions in Telangana</p>
        </header>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At Revithalize, we're committed to accelerating the transition to sustainable transportation 
                by making electric mobility accessible through innovative retrofitting solutions.
              </p>
              <p className="text-gray-300">
                We transform conventional vehicles into electric ones, extending their lifespan while 
                reducing carbon emissions and operating costs. Our mission is to revitalize existing vehicles 
                with clean technology, making sustainable transportation affordable for all.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <div className="bg-revithalize-green/20 p-2 rounded-full mr-3">
                    <Zap className="h-5 w-5 text-revithalize-green" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Electrify Existing Vehicles</h3>
                    <p className="text-gray-400 text-sm">Convert conventional vehicles to zero-emission electric</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-revithalize-blue/20 p-2 rounded-full mr-3">
                    <Globe className="h-5 w-5 text-revithalize-blue" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Reduce Carbon Footprint</h3>
                    <p className="text-gray-400 text-sm">Minimize environmental impact of transportation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 bg-gray-800 flex items-center justify-center p-6">
              <div className="max-w-md">
                <div className="flex justify-center mb-6">
                  <img 
                    src="/lovable-uploads/afdb710c-ae2c-425d-9f31-d6f96fab82eb.png" 
                    alt="Revithalize Logo" 
                    className="w-60 h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">Founded in 2022</h3>
                    <p className="text-gray-400 text-sm">Started with a vision to revolutionize transportation in Telangana</p>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">500+ Vehicles Retrofitted</h3>
                    <p className="text-gray-400 text-sm">Successfully converted over 500 vehicles to electric power</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="mr-2 h-5 w-5 text-revithalize-green" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Our diverse team of engineers, designers, and sustainability experts is dedicated to pushing the boundaries of EV retrofitting technology.
              </p>
              <p className="text-gray-400 text-sm">
                With combined experience of over 50 years in automotive and electrical engineering, we bring expertise and passion to every project.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Award className="mr-2 h-5 w-5 text-revithalize-green" />
                Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Recognized as a leader in sustainable transportation solutions in Telangana.
              </p>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Telangana Clean Tech Award 2023</li>
                <li>• Sustainability Innovation Prize 2022</li>
                <li>• EV Transformation Excellence Award</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="mr-2 h-5 w-5 text-revithalize-green" />
                Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Our retrofitting solutions have made a significant environmental impact.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">CO₂ Reduction</span>
                  <span className="text-revithalize-green">750+ tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fuel Saved</span>
                  <span className="text-revithalize-green">300,000+ liters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Clean KM Driven</span>
                  <span className="text-revithalize-green">2+ million</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
