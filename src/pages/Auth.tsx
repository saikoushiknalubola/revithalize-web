import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Progress } from '@/components/ui/progress';
import { 
  Loader2, Lock, Fingerprint, UserCheck, Mail, Bike, User, Building
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { supabase } from '@/integrations/supabase/client';

// Login form schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Enhanced registration form schema
const registerSchema = z.object({
  userType: z.enum(['individual', 'fleet'], {
    required_error: 'Please select user type',
  }),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  companyName: z.string().optional(),
  fleetSize: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: 'individual',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      fleetSize: '',
    },
  });

  const watchUserType = registerForm.watch('userType');

  // Check if already authenticated - only run once
  useEffect(() => {
    let mounted = true;
    
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted || !session) return;
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (!mounted) return;
        
        if (profile?.user_type === 'fleet') {
          navigate('/fleet-dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Calculate password strength
  const watchPassword = registerForm.watch('password');
  
  useEffect(() => {
    if (!watchPassword) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    // Length check
    if (watchPassword.length >= 6) strength += 20;
    if (watchPassword.length >= 10) strength += 10;
    
    // Character variety checks
    if (/[A-Z]/.test(watchPassword)) strength += 20; // uppercase
    if (/[a-z]/.test(watchPassword)) strength += 15; // lowercase
    if (/[0-9]/.test(watchPassword)) strength += 15; // numbers
    if (/[^A-Za-z0-9]/.test(watchPassword)) strength += 20; // special chars
    
    setPasswordStrength(strength);
  }, [watchPassword]);

  // Handle Login
  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      // Fetch user profile to determine redirect
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type, full_name')
        .eq('id', data.user.id)
        .maybeSingle();

      toast.success('Successfully logged in!', {
        description: `Welcome back, ${profile?.full_name || 'User'}`
      });

      // Navigate based on user type
      if (profile?.user_type === 'fleet') {
        navigate('/fleet-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error('Login failed', {
        description: error.message || 'Invalid email or password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: values.fullName,
            user_type: values.userType,
            company_name: values.companyName || null,
            fleet_size: values.fleetSize ? parseInt(values.fleetSize) : null,
          }
        }
      });

      if (error) throw error;

      toast.success('Account created successfully!', {
        description: `Welcome, ${values.fullName}`
      });

      // Navigate based on user type
      if (values.userType === 'fleet') {
        navigate('/fleet-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error('Registration failed', {
        description: error.message || 'Please try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black items-center justify-center p-4 bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px] pointer-events-none"></div>
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="w-[40rem] h-[40rem] rounded-full bg-revithalize-green/5 blur-3xl absolute"></div>
        <div className="w-[30rem] h-[30rem] rounded-full bg-revithalize-blue/5 blur-3xl absolute -translate-y-32 translate-x-32"></div>
      </div>
      
      <div className="w-full max-w-md space-y-6 animate-fade-in z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="p-2 rounded-full bg-gradient-to-br from-revithalize-dark to-black border border-revithalize-green/20 shadow-lg">
              <Bike className="h-10 w-10 text-revithalize-green animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue mb-2 animate-scale-in">
            ReVithalize Mobilitric
          </h1>
          <p className="text-gray-400 animate-fade-in">Smart Retrofitting Solutions for India</p>
        </div>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900/80 backdrop-blur-sm rounded-xl p-1 shadow-xl border border-gray-800">
            <TabsTrigger 
              value="login" 
              className="font-poppins data-[state=active]:bg-gradient-to-r data-[state=active]:from-revithalize-green data-[state=active]:to-revithalize-green/90 data-[state=active]:text-black rounded-lg transition-all duration-300"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="font-poppins data-[state=active]:bg-gradient-to-r data-[state=active]:from-revithalize-blue data-[state=active]:to-revithalize-blue/90 data-[state=active]:text-black rounded-lg transition-all duration-300"
            >
              <Fingerprint className="h-4 w-4 mr-2" />
              Register
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="animate-fade-in">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 overflow-hidden relative shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-revithalize-green to-transparent"></div>
              
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                  <CardHeader>
                    <CardTitle className="text-white font-poppins flex items-center gap-2">
                      <Lock className="h-5 w-5 text-revithalize-green" />
                      Welcome back
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-poppins">
                      Enter your credentials to access your account
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-revithalize-green" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="Enter your email" 
                              className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-green"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Lock className="h-4 w-4 mr-2 text-revithalize-green" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="password" 
                              placeholder="Enter your password"
                              className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-green"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="text-right">
                      <button 
                        type="button"
                        className="text-sm text-revithalize-green hover:underline transition-all"
                        onClick={() => toast.info('Password reset functionality coming soon!')}
                      >
                        Forgot password?
                      </button>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-revithalize-green to-revithalize-green/80 hover:to-revithalize-green text-black font-medium font-poppins h-11 transition-all duration-300 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center w-full">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging in...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Login
                        </div>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register" className="animate-fade-in">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800 overflow-hidden relative shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-revithalize-blue to-transparent"></div>
              
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)}>
                  <CardHeader>
                    <CardTitle className="text-white font-poppins flex items-center gap-2">
                      <Fingerprint className="h-5 w-5 text-revithalize-blue" />
                      Create an account
                    </CardTitle>
                    <CardDescription className="text-gray-400 font-poppins">
                      Enter your details to create your ReVithalize Mobilitric account
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <User className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Account Type
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-800/70 border-gray-700 text-white">
                                <SelectValue placeholder="Select account type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="individual">Individual User</SelectItem>
                              <SelectItem value="fleet">Fleet Manager</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <User className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              placeholder="Enter your full name"
                              className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="email" 
                              placeholder="your.email@example.com"
                              className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    {watchUserType === 'fleet' && (
                      <>
                        <FormField
                          control={registerForm.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-white font-poppins flex items-center">
                                <Building className="h-4 w-4 mr-2 text-revithalize-blue" />
                                Company Name
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field}
                                  placeholder="Your company name"
                                  className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="fleetSize"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-white font-poppins flex items-center">
                                <Bike className="h-4 w-4 mr-2 text-revithalize-blue" />
                                Fleet Size
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  {...field}
                                  type="number"
                                  placeholder="Number of vehicles"
                                  className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Lock className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="password"
                              placeholder="Create a password"
                              className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                            />
                          </FormControl>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">Password strength</span>
                              <span 
                                className={cn(
                                  "text-xs font-semibold",
                                  passwordStrength < 40 ? "text-red-400" : 
                                  passwordStrength < 70 ? "text-yellow-400" : 
                                  "text-green-400"
                                )}
                              >
                                {passwordStrength < 40 ? "Weak" : 
                                 passwordStrength < 70 ? "Medium" : 
                                 "Strong"}
                              </span>
                            </div>
                            <Progress 
                              value={passwordStrength} 
                              className="h-1 bg-gray-800" 
                              indicatorClassName={cn(
                                passwordStrength < 40 ? "bg-red-400" : 
                                passwordStrength < 70 ? "bg-yellow-400" : 
                                "bg-green-400"
                              )}
                            />
                          </div>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Lock className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="password"
                              placeholder="Confirm your password"
                              className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-revithalize-blue to-revithalize-blue/80 hover:to-revithalize-blue text-black font-medium font-poppins h-11 transition-all duration-300 shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center w-full">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Fingerprint className="mr-2 h-4 w-4" />
                          Create account
                        </div>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-sm text-gray-500 animate-fade-in">
          <p>© 2025 ReVithalize • Made in India 🇮🇳</p>
        </div>
      </div>
    </div>
  );
}
