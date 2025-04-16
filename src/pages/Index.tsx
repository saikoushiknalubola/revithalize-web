
import React from 'react';
import { Battery, MapPin, Zap, Wrench, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white font-body p-4 md:p-6">
      <div className="container mx-auto">
        <header className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-revithalize-green mb-4">
            Revithalize
            <span className="text-white ml-2">EV</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your comprehensive electric vehicle management system for Telangana
          </p>
          <p className="text-sm md:text-md text-gray-400 mt-3">
            Featuring Hero Honda Passion AP02SK2409 with 51.2V 45Ah battery
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { 
              icon: Bike, 
              title: 'Hero Honda Passion', 
              description: 'AP02SK2409 - Smart EV Technology'
            },
            { 
              icon: Battery, 
              title: 'Battery Status', 
              description: '51.2V 45Ah battery with 110km range' 
            },
            { 
              icon: MapPin, 
              title: 'Route Optimization', 
              description: 'Smart charging and route planning' 
            },
            { 
              icon: Zap, 
              title: 'Battery Analytics', 
              description: 'Detailed performance and efficiency' 
            },
          ].map(({ icon: Icon, title, description }, index) => (
            <div 
              key={title} 
              className="bg-gray-900 p-4 md:p-6 rounded-xl border border-revithalize-green/20 
                         hover:border-revithalize-green/50 transition-all duration-300 
                         hover:scale-102 group shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-revithalize-green flex justify-center md:justify-start">
                <Icon size={36} strokeWidth={1.5} className="group-hover:animate-pulse" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-white text-center md:text-left">
                {title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors text-center md:text-left text-sm md:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link 
            to="/auth" 
            className="bg-gradient-to-r from-revithalize-green to-revithalize-blue hover:from-revithalize-green/90 hover:to-revithalize-blue/90 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
