
import React from 'react';
import { Battery, MapPin, Zap, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white font-body p-6">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-heading font-bold text-revithalize-green mb-4">
            Revithalize
            <span className="text-white ml-2">EV</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your comprehensive electric vehicle management system for Telangana
          </p>
          <p className="text-md text-gray-400 mt-3">
            Featuring Hero Honda Passion AP02SK2409 with 51.2V 45Ah battery
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
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
              description: 'Detailed performance and efficiency insights' 
            },
            { 
              icon: Wrench, 
              title: 'Maintenance', 
              description: 'Predictive maintenance and service scheduling' 
            }
          ].map(({ icon: Icon, title, description }) => (
            <div 
              key={title} 
              className="bg-gray-900 p-6 rounded-lg border border-revithalize-green/20 
                         hover:border-revithalize-green/50 transition-all duration-300 
                         hover:scale-105 group"
            >
              <div className="mb-4 text-revithalize-green">
                <Icon size={48} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2 text-white">
                {title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/auth" 
            className="bg-revithalize-green hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full transition-colors inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
