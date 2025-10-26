import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

export const DashboardRouter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserTypeAndRedirect = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/auth');
          return;
        }

        // Fetch user profile to get user type
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          navigate('/auth');
          return;
        }

        // Route based on user type
        if (profile?.user_type === 'fleet') {
          navigate('/fleet-dashboard');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error in DashboardRouter:', error);
        navigate('/auth');
      } finally {
        setLoading(false);
      }
    };

    checkUserTypeAndRedirect();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-revithalize-green mx-auto mb-4" />
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return null;
};
