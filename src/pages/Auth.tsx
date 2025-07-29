
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Progress } from '@/components/ui/progress';
import { 
  AtSign, Key, User, Loader2, Shield, MapPin, Phone, 
  Briefcase, Building, Lock, Fingerprint, UserCheck, 
  Mail, Home, Bike, Truck, Users, Building2, CheckCircle
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useScreenSize } from '@/hooks/use-mobile';
import { motion } from 'framer-motion';

// Login form schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Enhanced registration form schema with user type selection
const registerSchema = z.object({
  userType: z.enum(['individual', 'fleet'], {
    required_error: 'Please select an account type',
  }),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(1, 'Please enter your last name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(2, 'Please enter your city'),
  occupation: z.string().min(2, 'Please enter your occupation'),
  company: z.string().optional(),
  // Fleet-specific fields
  organizationName: z.string().optional(),
  organizationRole: z.string().optional(),
  fleetSize: z.coerce.number().optional(),
  industry: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}).refine(data => {
  if (data.userType === 'fleet') {
    return data.organizationName && data.organizationRole && data.fleetSize && data.industry;
  }
  return true;
}, {
  message: 'All organization fields are required for fleet accounts',
  path: ['organizationName'],
});

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [activeTab, setActiveTab] = useState('login');
  const { isMobile, width } = useScreenSize();
  
  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Register form with enhanced fields
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: 'individual',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      occupation: '',
      company: '',
      organizationName: '',
      organizationRole: '',
      fleetSize: undefined,
      industry: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Watch user type to show/hide fleet fields
  const watchedUserType = registerForm.watch('userType');

  // Check if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Set up default users in localStorage if they don't exist
  useEffect(() => {
    const defaultUsers = [
      {
        email: 'saikoushiknalubola@gmail.com',
        password: 'Saikoushik@456',
        name: 'Saikoushik Nalubola',
        firstName: 'Saikoushik',
        lastName: 'Nalubola',
        phone: '9876543210',
        address: 'Hyderabad',
        city: 'Hyderabad',
        occupation: 'CEO',
        company: 'ReVithalize',
        userType: 'individual',
        joinDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
      },
      {
        email: 'fleet@revithalize.com',
        password: 'Fleet@123',
        name: 'Fleet Manager',
        firstName: 'Fleet',
        lastName: 'Manager',
        phone: '9876543211',
        address: 'Bangalore',
        city: 'Bangalore',
        occupation: 'Fleet Operations Manager',
        company: 'Enterprise Fleet Solutions',
        userType: 'fleet',
        organizationName: 'Enterprise Fleet Solutions',
        organizationRole: 'Fleet Operations Manager',
        fleetSize: 150,
        industry: 'Transportation & Logistics',
        joinDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
      }
    ];
    
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    defaultUsers.forEach(defaultUser => {
      if (!existingUsers.some((user: any) => user.email === defaultUser.email)) {
        existingUsers.push(defaultUser);
      }
    });
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }, []);

  // Calculate password strength
  useEffect(() => {
    const password = registerForm.watch('password');
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    // Length check
    if (password.length >= 6) strength += 20;
    if (password.length >= 10) strength += 10;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 20; // uppercase
    if (/[a-z]/.test(password)) strength += 15; // lowercase
    if (/[0-9]/.test(password)) strength += 15; // numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 20; // special chars
    
    setPasswordStrength(strength);
  }, [registerForm.watch('password')]);

  // Handle Login
  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // Fleet test account
      if (values.email === 'revithalize' && values.password === 'revithalize123') {
        const fleetUser = {
          email: 'fleet@revithalize.com',
          password: 'revithalize123',
          name: 'Fleet Manager',
          firstName: 'Fleet',
          lastName: 'Manager',
          phone: '+91 9876543210',
          address: 'Fleet Operations Center',
          city: 'Bangalore',
          occupation: 'Fleet Operations Manager',
          company: 'Enterprise Fleet Solutions',
          joinDate: new Date().toISOString().split('T')[0],
          userType: 'fleet' as const,
          organizationName: 'Enterprise Fleet Solutions',
          fleetSize: 150,
          organizationRole: 'Fleet Operations Manager',
          industry: 'Transportation & Logistics'
        };
        
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(fleetUser));
        toast.success('Welcome to Fleet Operations!', {
          description: 'Fleet Dashboard loaded successfully'
        });
        navigate('/dashboard');
        setIsLoading(false);
        return;
      }

      // Get existing user data if available
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = existingUsers.find((u: any) => u.email === values.email);
      
      if (user && user.password === values.password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(`Hey there! Welcome back 🎉`, {
          description: user.userType === 'fleet' ? 'Fleet Dashboard ready' : 'Your EV is waiting for you'
        });
        navigate('/dashboard');
      } else {
        toast.error('Oops! Something went wrong', {
          description: 'Please check your email and password'
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  // Handle Registration with enhanced data
  const handleRegister = (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      const newUser = { 
        email: values.email,
        password: values.password, 
        name: `${values.firstName} ${values.lastName}`,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        address: values.address,
        city: values.city,
        occupation: values.occupation,
        company: values.company || 'Not specified',
        userType: values.userType,
        // Fleet-specific fields
        organizationName: values.organizationName,
        organizationRole: values.organizationRole,
        fleetSize: values.fleetSize,
        industry: values.industry,
        joinDate: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
      };
      
      // Save to users collection in localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Set as current user
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success(`${values.userType === 'fleet' ? 'Fleet' : 'Individual'} account created successfully!`, {
        description: `Welcome, ${values.firstName}${values.userType === 'fleet' ? ' - Fleet Dashboard Ready' : ''}`
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 1500);
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
            ReVithalize
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
                            <div className="relative">
                              <Input 
                                {...field}
                                placeholder="Enter your email" 
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-green"
                              />
                              <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
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
                            <Key className="h-4 w-4 mr-2 text-revithalize-green" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type="password" 
                                placeholder="Enter your password"
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-green"
                              />
                              <Lock className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
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
                      Enter your details to create your ReVithalize account
                    </CardDescription>
                  </CardHeader>
                  
                   <CardContent className={cn("space-y-4", isMobile ? "px-3" : "")}>
                     {/* User Type Selection */}
                     <FormField
                       control={registerForm.control}
                       name="userType"
                       render={({ field }) => (
                         <FormItem className="space-y-3">
                           <FormLabel className="text-white font-poppins">Account Type</FormLabel>
                           <div className="grid grid-cols-2 gap-4">
                             <div 
                               className={cn(
                                 "relative cursor-pointer rounded-lg border-2 p-4 transition-all",
                                 field.value === 'individual' 
                                   ? "border-revithalize-green bg-revithalize-green/10" 
                                   : "border-gray-700 hover:border-gray-600"
                               )}
                               onClick={() => field.onChange('individual')}
                             >
                               <div className="flex flex-col items-center space-y-2">
                                 <User className={cn(
                                   "h-8 w-8",
                                   field.value === 'individual' ? "text-revithalize-green" : "text-gray-400"
                                 )} />
                                 <div className="text-center">
                                   <p className={cn(
                                     "font-medium",
                                     field.value === 'individual' ? "text-revithalize-green" : "text-white"
                                   )}>Individual User</p>
                                   <p className="text-xs text-gray-400">Personal EV management</p>
                                 </div>
                                 {field.value === 'individual' && (
                                   <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-revithalize-green" />
                                 )}
                               </div>
                             </div>
                             
                             <div 
                               className={cn(
                                 "relative cursor-pointer rounded-lg border-2 p-4 transition-all",
                                 field.value === 'fleet' 
                                   ? "border-revithalize-blue bg-revithalize-blue/10" 
                                   : "border-gray-700 hover:border-gray-600"
                               )}
                               onClick={() => field.onChange('fleet')}
                             >
                               <div className="flex flex-col items-center space-y-2">
                                 <Truck className={cn(
                                   "h-8 w-8",
                                   field.value === 'fleet' ? "text-revithalize-blue" : "text-gray-400"
                                 )} />
                                 <div className="text-center">
                                   <p className={cn(
                                     "font-medium",
                                     field.value === 'fleet' ? "text-revithalize-blue" : "text-white"
                                   )}>Fleet Manager</p>
                                   <p className="text-xs text-gray-400">Manage multiple vehicles</p>
                                 </div>
                                 {field.value === 'fleet' && (
                                   <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-revithalize-blue" />
                                 )}
                               </div>
                             </div>
                           </div>
                           <FormMessage className="text-red-400" />
                         </FormItem>
                       )}
                     />

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-white font-poppins flex items-center">
                              <User className="h-4 w-4 mr-2 text-revithalize-blue" />
                              First name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="First name"
                                className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-white font-poppins flex items-center">
                              <User className="h-4 w-4 mr-2 text-revithalize-blue" />
                              Last name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="Last name"
                                className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
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
                            <div className="relative">
                              <Input 
                                {...field}
                                type="email" 
                                placeholder="Your email address"
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Mail className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                placeholder="10-digit mobile number" 
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Phone className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Home className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Address
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                placeholder="Your full address" 
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Home className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Building className="h-4 w-4 mr-2 text-revithalize-blue" />
                            City
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                placeholder="Your city" 
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Building className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-white font-poppins flex items-center">
                              <Briefcase className="h-4 w-4 mr-2 text-revithalize-blue" />
                              Occupation
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="Your occupation"
                                className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-white font-poppins flex items-center">
                              <Building className="h-4 w-4 mr-2 text-revithalize-blue" />
                              Company
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                placeholder="Optional"
                                className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                     </div>
                     
                     {/* Fleet-specific fields */}
                     {watchedUserType === 'fleet' && (
                       <motion.div 
                         className="space-y-4 border-t border-gray-800 pt-4"
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         transition={{ duration: 0.3 }}
                       >
                         <div className="flex items-center gap-2 text-revithalize-blue">
                           <Building2 className="h-4 w-4" />
                           <span className="text-sm font-medium">Organization Details</span>
                         </div>
                         
                         <FormField
                           control={registerForm.control}
                           name="organizationName"
                           render={({ field }) => (
                             <FormItem className="space-y-2">
                               <FormLabel className="text-white font-poppins flex items-center">
                                 <Building2 className="h-4 w-4 mr-2 text-revithalize-blue" />
                                 Organization Name
                               </FormLabel>
                               <FormControl>
                                 <Input 
                                   {...field}
                                   placeholder="Your company/organization name"
                                   className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                                 />
                               </FormControl>
                               <FormMessage className="text-red-400" />
                             </FormItem>
                           )}
                         />
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <FormField
                             control={registerForm.control}
                             name="organizationRole"
                             render={({ field }) => (
                               <FormItem className="space-y-2">
                                 <FormLabel className="text-white font-poppins flex items-center">
                                   <Users className="h-4 w-4 mr-2 text-revithalize-blue" />
                                   Your Role
                                 </FormLabel>
                                 <FormControl>
                                   <Input 
                                     {...field}
                                     placeholder="Fleet Manager, Operations Lead, etc."
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
                                   <Truck className="h-4 w-4 mr-2 text-revithalize-blue" />
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
                         </div>
                         
                         <FormField
                           control={registerForm.control}
                           name="industry"
                           render={({ field }) => (
                             <FormItem className="space-y-2">
                               <FormLabel className="text-white font-poppins flex items-center">
                                 <Briefcase className="h-4 w-4 mr-2 text-revithalize-blue" />
                                 Industry
                               </FormLabel>
                               <FormControl>
                                 <Input 
                                   {...field}
                                   placeholder="Transportation, Logistics, Delivery, etc."
                                   className="bg-gray-800/70 border-gray-700 text-white transition-all focus:border-revithalize-blue"
                                 />
                               </FormControl>
                               <FormMessage className="text-red-400" />
                             </FormItem>
                           )}
                         />
                       </motion.div>
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
                            <div className="relative">
                              <Input 
                                {...field}
                                type="password"
                                placeholder="Create a password"
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Lock className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
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
                            <Shield className="h-4 w-4 mr-2 text-revithalize-blue" />
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type="password"
                                placeholder="Confirm your password"
                                className="bg-gray-800/70 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Shield className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  
                  <CardFooter className={cn(isMobile ? "px-3 pb-6" : "")}>
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
