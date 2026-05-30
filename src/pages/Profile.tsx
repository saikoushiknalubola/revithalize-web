import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Mail, Phone, MapPin, Calendar, Edit,
  LogOut, Bike, Briefcase, Building
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';


interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  occupation: string;
  company: string;
  joinDate: string;
  initials: string;
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    occupation: '',
    company: '',
    joinDate: '',
    initials: 'U',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Omit<UserData, 'initials'>>({
    name: '', email: '', phone: '', address: '', city: '', occupation: '', company: '', joinDate: ''
  });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      const p: any = profile || {};
      const meta: any = user.user_metadata || {};
      const name = p.full_name || meta.full_name || meta.name || user.email?.split('@')[0] || 'Rider';
      const joinDate = new Date(user.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

      const data: UserData = {
        name,
        email: user.email || '',
        phone: meta.phone || '',
        address: '',
        city: '',
        occupation: '',
        company: p.company_name || '',
        joinDate,
        initials: getInitials(name),
      };
      setUserData(data);
      setEditForm({ ...data });
      setLoading(false);
    })();
  }, [navigate]);

  const handleSaveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: editForm.name,
        company_name: editForm.company,
      } as any)
      .eq('id', user.id);
    toast.success('Profile updated');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out');
    navigate('/auth');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh] text-gray-400">Loading profile…</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-5xl mx-auto px-2 sm:px-0">
        <header>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">My Profile</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your account and connected bike</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-[#121212] border-[#2A2A2E]">
            <CardHeader className="pb-2 text-center">
              <div className="mx-auto mb-4 relative w-fit">
                <div className="w-24 h-24 bg-gradient-to-br from-[#22C55E] to-[#1E6BFF] rounded-full flex items-center justify-center text-black text-3xl font-bold">
                  {userData.initials}
                </div>
                <button
                  className="absolute bottom-0 right-0 bg-[#1C1C1E] p-1.5 rounded-full border border-[#2A2A2E] hover:bg-[#2A2A2E]"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={14} className="text-white" />
                </button>
              </div>
              <CardTitle className="text-white text-xl break-words">{userData.name}</CardTitle>
              <p className="text-gray-400 text-sm break-all">{userData.email}</p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-300"><Mail size={16} className="text-[#22C55E]" /><span className="break-all">{userData.email}</span></div>
                {userData.phone && <div className="flex items-center gap-3 text-gray-300"><Phone size={16} className="text-[#22C55E]" />{userData.phone}</div>}
                {userData.address && <div className="flex items-center gap-3 text-gray-300"><MapPin size={16} className="text-[#22C55E]" />{userData.address}</div>}
                {userData.city && <div className="flex items-center gap-3 text-gray-300"><Building size={16} className="text-[#22C55E]" />{userData.city}</div>}
                {userData.company && <div className="flex items-center gap-3 text-gray-300"><Briefcase size={16} className="text-[#22C55E]" />{userData.company}</div>}
                <div className="flex items-center gap-3 text-gray-300"><Calendar size={16} className="text-[#22C55E]" />Member since {userData.joinDate}</div>
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Button variant="outline" className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />Sign Out
              </Button>
            </CardFooter>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {isEditing ? (
              <Card className="bg-[#121212] border-[#2A2A2E]">
                <CardHeader>
                  <CardTitle className="text-white">Edit Profile</CardTitle>
                  <CardDescription className="text-gray-400">Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'name', label: 'Full Name' },
                      { id: 'phone', label: 'Phone Number' },
                      { id: 'address', label: 'Address' },
                      { id: 'city', label: 'City' },
                      { id: 'occupation', label: 'Occupation' },
                      { id: 'company', label: 'Company' },
                    ].map((f) => (
                      <div key={f.id} className="space-y-2">
                        <Label htmlFor={f.id} className="text-white">{f.label}</Label>
                        <Input
                          id={f.id}
                          name={f.id}
                          value={(editForm as any)[f.id]}
                          onChange={handleChange}
                          className="bg-[#1C1C1E] border-[#2A2A2E] text-white"
                        />
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Label className="text-white">Email</Label>
                      <Input value={editForm.email} disabled className="bg-[#1C1C1E] border-[#2A2A2E] text-white/60" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => { setIsEditing(false); setEditForm({ ...userData }); }}>Cancel</Button>
                  <Button onClick={handleSaveProfile} className="bg-[#22C55E] text-black hover:bg-[#22C55E]/90">Save Changes</Button>
                </CardFooter>
              </Card>
            ) : (
              <>
                <Card className="bg-[#121212] border-[#2A2A2E]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Bike className="mr-2 h-5 w-5 text-[#22C55E]" />
                      My Connected Bike
                    </CardTitle>
                    <CardDescription className="text-gray-400">Your retrofit electric vehicle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-[#1C1C1E] rounded-xl border border-[#2A2A2E] flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-revithalize-green/25 to-revithalize-blue/15 border border-revithalize-green/20 flex items-center justify-center mx-auto sm:mx-0">
                        <Bike className="w-8 h-8 text-revithalize-green" />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-white font-semibold">Hero Honda Passion Pro</h3>
                        <p className="text-xs text-gray-400">Retrofit Electric Conversion</p>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                          <span className="bg-revithalize-green/15 text-revithalize-green px-2.5 py-1 rounded-full text-xs">Active</span>
                          <span className="bg-revithalize-blue/15 text-revithalize-blue px-2.5 py-1 rounded-full text-xs">82% Charged</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121212] border-[#2A2A2E]">
                  <CardHeader>
                    <CardTitle className="text-white">Ride Statistics</CardTitle>
                    <CardDescription className="text-gray-400">Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { label: 'Distance', value: '437 km' },
                        { label: 'Energy', value: '89 kWh' },
                        { label: 'Sessions', value: '17' },
                      ].map((s) => (
                        <div key={s.label} className="bg-[#1C1C1E] p-4 rounded-xl border border-[#2A2A2E]">
                          <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                          <p className="text-xl font-bold text-white">{s.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
