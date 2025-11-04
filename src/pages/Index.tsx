import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingAnimation } from '@/components/animations/LoadingAnimation';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const navigate = useNavigate();
  
  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.user_type === 'fleet') {
          navigate('/fleet-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white font-body p-3 sm:p-4 md:p-6">
      <LoadingAnimation />
      
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <div className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-orange-500/10 via-white/5 to-green-500/10 rounded-full border border-orange-500/30 shadow-lg hover:shadow-xl hover:border-orange-500/50 transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-green-500/5 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <span className="relative text-xl sm:text-2xl animate-pulse">🇮🇳</span>
              <span className="relative text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent tracking-wider uppercase">
                Made in India
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold bg-gradient-to-r from-revithalize-green via-revithalize-blue to-revithalize-green bg-clip-text text-transparent mb-3 md:mb-4 leading-tight px-4 animate-fade-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '200ms' }}>
            ReVithalize Mobilitric
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-revithalize-blue font-semibold mb-2 animate-fade-in tracking-wide" style={{ animationDelay: '300ms' }}>
            Sustainable Mobility for the Future
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
            Transforming conventional two-wheelers into smart electric vehicles
          </p>
        </header>

        <div className="space-y-6 md:space-y-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="bg-gray-900 p-5 md:p-8 rounded-xl border border-revithalize-green/20">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-revithalize-green">Our Story</h2>
            <p className="text-gray-300 mb-4">
              ReVithalize Mobilitric was born from a simple yet powerful idea in early 2024 — "What if we could bring old fuel-powered bikes back to life, sustainably?" Inspired by a conversation with family, Founder Nalubola Saikoushik decided to take on India's two-wheeler pollution challenge through innovation, passion, and purpose.
            </p>
            <p className="text-gray-300 mb-4">
              ReVithalize Mobilitric is an EV retrofitting startup that transforms internal combustion engine (ICE) two-wheelers into affordable, smart electric vehicles, using modular AI-powered conversion kits. Our solution enables common users to shift to electric mobility without having to buy a new vehicle — saving costs, reducing e-waste, and cutting down carbon emissions.
            </p>
            <p className="text-gray-300 mb-4">
              We aim to decentralize electrification by partnering with local mechanics, training EV technicians, and building a network of certified retrofit centers across India. Incubated at SR Innovation Exchange and backed by T-Hub & Mercedes-Benz R&D India (MBRDI) through their Climate Tech Incubator, we have been recognized by IIT Bombay, IIIT Tirupati iHub Navavishkar, and the IIT Madras Research Park.
            </p>
            <p className="text-gray-300">
              At ReVithalize Mobilitric, our mission is to revive, reimagine, and revolutionize mobility for a cleaner tomorrow. We envision a future where every petrol bike has the potential to become electric — empowering communities, creating green jobs, and accelerating India's transition to net-zero transportation.
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link 
            to="/auth" 
            className="bg-gradient-to-r from-revithalize-green to-revithalize-blue hover:from-revithalize-green/90 hover:to-revithalize-blue/90 text-black font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Get Started
          </Link>
          
          <a 
            href="https://revithalize.tech/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-800 hover:bg-gray-700 border-2 border-revithalize-green text-revithalize-green font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
          >
            Visit Our Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
