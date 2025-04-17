
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingAnimation } from '@/components/animations/LoadingAnimation';

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white font-body p-3 sm:p-4 md:p-6">
      <LoadingAnimation />
      
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-revithalize-green mb-3 md:mb-4">
            ReVithalize
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Transforming conventional two-wheelers into smart electric vehicles
          </p>
        </header>

        <div className="space-y-6 md:space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="bg-gray-900 p-5 md:p-8 rounded-xl border border-revithalize-green/20">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-revithalize-green">Our Story</h2>
            <p className="text-gray-300 mb-4">
              ReVithalize was born from a simple yet powerful idea in early 2024 — "What if we could bring old fuel-powered bikes back to life, sustainably?" Inspired by a conversation with family, Founder Nalubola Saikoushik decided to take on India's two-wheeler pollution challenge through innovation, passion, and purpose.
            </p>
            <p className="text-gray-300 mb-4">
              ReVithalize is an EV retrofitting startup that transforms internal combustion engine (ICE) two-wheelers into affordable, smart electric vehicles, using modular AI-powered conversion kits. Our solution enables common users to shift to electric mobility without having to buy a new vehicle — saving costs, reducing e-waste, and cutting down carbon emissions.
            </p>
            <p className="text-gray-300 mb-4">
              We aim to decentralize electrification by partnering with local mechanics, training EV technicians, and building a network of certified retrofit centers across India. We're backed by T-Hub & Mercedes-Benz R&D India (MBRDI) through their Climate Tech Incubator, and have been recognized by IIT Bombay, IIIT Tirupati iHub Navavishkar, and the IIT Madras Research Park.
            </p>
            <p className="text-gray-300">
              At ReVithalize, our mission is to revive, reimagine, and revolutionize mobility for a cleaner tomorrow. We envision a future where every petrol bike has the potential to become electric — empowering communities, creating green jobs, and accelerating India's transition to net-zero transportation.
            </p>
          </div>
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
