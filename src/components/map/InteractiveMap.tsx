
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useScreenSize } from '@/hooks/use-mobile';

// Mock data for charging stations
const CHARGING_STATIONS = [
  { id: 1, lat: 17.385, lng: 78.4867, name: "Hitec City Retrofit Station", address: "Hyderabad, Telangana" },
  { id: 2, lat: 17.415, lng: 78.435, name: "Banjara Hills Charger", address: "Banjara Hills, Hyderabad" },
  { id: 3, lat: 17.375, lng: 78.474, name: "Madhapur Retrofit Hub", address: "Madhapur, Hyderabad" },
];

interface MapProps {
  className?: string;
  height?: string;
}

const InteractiveMap: React.FC<MapProps> = ({ className = "", height = "400px" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useScreenSize();
  
  useEffect(() => {
    const mockLoadMap = () => {
      console.log("Map would load here with real implementation");
    };
    
    mockLoadMap();
    
    // In a real implementation, we would clean up map resources
    return () => {
      console.log("Cleanup would happen here");
    };
  }, []);

  return (
    <div className={`rounded-lg overflow-hidden ${className}`} style={{ height }}>
      {/* This is a placeholder for the actual map */}
      <div ref={mapRef} className="relative w-full h-full bg-gray-900 border border-gray-800 flex flex-col">
        {/* Fake map interface */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-90">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-900">
            {/* Grid lines to simulate a map */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>
        
        {/* Map center indicator */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-revithalize-green animate-pulse">
          <MapPin size={isMobile ? 24 : 32} fill="rgba(0, 255, 148, 0.2)" />
        </div>
        
        {/* Charging stations */}
        {CHARGING_STATIONS.map((station, index) => (
          <div 
            key={station.id}
            className="absolute bg-revithalize-green/10 rounded-full p-1 cursor-pointer hover:scale-110 transition-transform"
            style={{ 
              left: `calc(${40 + (station.lng - 78.4) * 100}%)`, 
              top: `calc(${40 + (station.lat - 17.36) * 100}%)`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="relative">
              <MapPin 
                size={isMobile ? 20 : 24} 
                className="text-revithalize-green" 
                fill="rgba(0, 255, 148, 0.2)" 
              />
              <div className="absolute inset-0 bg-revithalize-green/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900/90 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">
              {station.name}
            </div>
          </div>
        ))}
        
        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
          <button className="bg-gray-800 p-2 rounded-md text-white hover:bg-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
          </button>
        </div>
        
        {/* Map attribution */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-500">
          Interactive Map © Revithalize
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
