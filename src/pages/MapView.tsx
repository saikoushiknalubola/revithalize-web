
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MapPin, Battery, Navigation, Search, Filter, Zap, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import InteractiveMap from '@/components/map/InteractiveMap';
import { useScreenSize } from '@/hooks/use-mobile';

export default function MapView() {
  const { isMobile } = useScreenSize();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">Charging Map</h1>
          <p className="text-gray-400 mt-1">Find retrofitting stations and charging points</p>
        </header>

        <div className="relative">
          {/* Map search controls */}
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-3">
            <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg flex items-center px-3 py-2">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search for charging stations..."
                className="bg-transparent border-none text-white w-full focus:outline-none text-sm"
              />
            </div>
            <button className="bg-gray-900 border border-gray-800 rounded-lg p-2">
              <Filter className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Interactive Map */}
          <InteractiveMap height={isMobile ? "300px" : "500px"} />

          {/* Nearby charging stations */}
          <div className="mt-6">
            <h2 className="text-xl font-medium text-white mb-4">Nearby Retrofitting & Charging Stations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  name: "Hitec City Retrofit Hub", 
                  distance: "1.2 km", 
                  available: 3, 
                  total: 5, 
                  power: "25 kW",
                  status: "Available",
                  services: ["Retrofitting", "Charging", "Battery Swap"]
                },
                { 
                  name: "Banjara Hills Station", 
                  distance: "3.5 km", 
                  available: 1, 
                  total: 2, 
                  power: "50 kW",
                  status: "Available",
                  services: ["Charging", "Quick Repairs"]
                },
                { 
                  name: "Madhapur Service Center", 
                  distance: "4.1 km", 
                  available: 0, 
                  total: 3, 
                  power: "100 kW",
                  status: "Busy",
                  services: ["Full Retrofitting", "Diagnostics", "Charging"]
                },
              ].map((station, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${station.available > 0 ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                        <MapPin className={`h-5 w-5 ${station.available > 0 ? 'text-green-500' : 'text-red-500'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white mb-1">{station.name}</h3>
                        <p className="text-sm text-gray-400">{station.distance} away</p>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-400">Status</p>
                            <p className={`font-medium ${station.available > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {station.status}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400">Bays</p>
                            <p className="font-medium text-white">
                              {station.available}/{station.total} available
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-xs text-gray-400 mb-2">Services:</p>
                          <div className="flex flex-wrap gap-1">
                            {station.services.map((service, i) => (
                              <span key={i} className="text-xs bg-gray-800 text-white px-2 py-1 rounded-full">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-sm font-medium text-revithalize-green">{station.power} DC Fast Charging</p>
                          <button className="text-xs bg-revithalize-dark hover:bg-gray-800 text-white px-3 py-1 rounded transition-colors">
                            Navigate
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
