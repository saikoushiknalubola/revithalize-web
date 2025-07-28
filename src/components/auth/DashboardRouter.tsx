import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserData } from '@/types/User';
import Dashboard from '@/pages/Dashboard';
import FleetDashboard from '@/pages/FleetDashboard';

export const DashboardRouter = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        const user = JSON.parse(storedUserData);
        // Handle legacy users without userType
        if (!user.userType) {
          user.userType = 'individual';
          localStorage.setItem('user', JSON.stringify(user));
        }
        setUserData(user);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-revithalize-green mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return <Navigate to="/auth" replace />;
  }

  // Route to appropriate dashboard based on user type
  if (userData.userType === 'fleet') {
    return <FleetDashboard />;
  } else {
    return <Dashboard />;
  }
};