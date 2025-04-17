
import React, { useEffect } from 'react';
import { Battery, MapPin, Zap, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { LoadingAnimation } from '@/components/animations/LoadingAnimation';

const Index = () => {
  const { isMobile } = useScreenSize();
  
  return (
    <div className="min-h-screen bg-black text-white font-body p-3 sm:p-4 md:p-6">
      <LoadingAnimation />
      
      <div className="container mx-auto">
        <header className="text-center mb-6 md:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-revithalize-green mb-3 md:mb-4">
            Revithalize
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your comprehensive EV retrofitting solution for Telangana
          </p>
          <p className="text-xs sm:text-sm md:text-md text-gray-400 mt-2 md:mt-3 px-4">
            Transform conventional vehicles into clean, efficient electric vehicles
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {[
            { 
              icon: Bike, 
              title: 'EV Retrofitting', 
              description: 'Convert your existing vehicle to electric power'
            },
            { 
              icon: Battery, 
              title: 'Battery Systems', 
              description: 'Custom batteries with smart monitoring' 
            },
            { 
              icon: MapPin, 
              title: 'Charging Network', 
              description: 'Access our growing charging infrastructure' 
            },
            { 
              icon: Zap, 
              title: 'Performance Analytics', 
              description: 'Track efficiency and optimize range' 
            },
          ].map(({ icon: Icon, title, description }, index) => (
            <div 
              key={title} 
              className="bg-gray-900 p-3 sm:p-4 md:p-6 rounded-xl border border-revithalize-green/20 
                         hover:border-revithalize-green/50 transition-all duration-300 
                         hover:scale-102 group shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-3 md:mb-4 text-revithalize-green flex justify-center md:justify-start">
                <Icon size={isMobile ? 28 : 36} strokeWidth={1.5} className="group-hover:animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold mb-1 sm:mb-2 text-white text-center md:text-left">
                {title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors text-center md:text-left text-xs sm:text-sm md:text-base">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link 
            to="/auth" 
            className="bg-gradient-to-r from-revithalize-green to-revithalize-blue hover:from-revithalize-green/90 hover:to-revithalize-blue/90 text-black font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
