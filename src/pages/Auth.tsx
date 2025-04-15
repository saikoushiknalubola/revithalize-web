import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Progress } from '@/components/ui/progress';
import { AtSign, Key, User, Loader2, Shield, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Login form schema
const loginSchema = z.object({
  email: z.string().email('कृपया वैध ईमेल पता दर्ज करें (Please enter a valid email)'),
  password: z.string().min(6, 'पासवर्ड कम से कम 6 अक्षर होना चाहिए (Password must be at least 6 characters)'),
});

// Registration form schema with name fields
const registerSchema = z.object({
  firstName: z.string().min(2, 'नाम कम से कम 2 अक्षर होना चाहिए (First name must be at least 2 characters)'),
  lastName: z.string().min(1, 'उपनाम दर्ज करें (Please enter your last name)'),
  email: z.string().email('कृपया वैध ईमेल पता दर्ज करें (Please enter a valid email)'),
  city: z.string().min(2, 'शहर का नाम दर्ज करें (Please enter your city)'),
  password: z.string().min(6, 'पासवर्ड कम से कम 6 अक्षर होना चाहिए (Password must be at least 6 characters)'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'पासवर्ड मेल नहीं खाते (Passwords do not match)',
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
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      password: '',
      confirmPassword: '',
    },
  });

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
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ 
        email: values.email,
        name: 'उपयोगकर्ता' // Default name if logging in without registration
      }));
      toast.success('सफलतापूर्वक लॉग इन हो गया! (Successfully logged in!)', {
        description: 'आपका स्वागत है (Welcome back)'
      });
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  // Handle Registration
  const handleRegister = (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ 
        email: values.email,
        name: `${values.firstName} ${values.lastName}`,
        city: values.city
      }));
      toast.success('खाता सफलतापूर्वक बनाया गया! (Account created successfully!)', {
        description: 'स्वागत है, ' + values.firstName
      });
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-black items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-poppins font-bold text-revithalize-green mb-2 animate-scale-in">
            Revithalize<span className="text-white">EV</span>
          </h1>
          <p className="text-gray-400 animate-fade-in">भारत का स्मार्ट ईवी प्रबंधन प्लेटफॉर्म</p>
          <p className="text-gray-400">(India's Smart EV Management Platform)</p>
        </div>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 rounded-xl p-1">
            <TabsTrigger 
              value="login" 
              className="font-poppins data-[state=active]:bg-revithalize-green data-[state=active]:text-black rounded-lg transition-all duration-300"
            >
              लॉग इन (Login)
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="font-poppins data-[state=active]:bg-revithalize-blue data-[state=active]:text-black rounded-lg transition-all duration-300"
            >
              रजिस्टर (Register)
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="animate-fade-in">
            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-revithalize-green to-transparent"></div>
              
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                  <CardHeader>
                    <CardTitle className="text-white font-poppins">वापसी पर स्वागत है (Welcome back)</CardTitle>
                    <CardDescription className="text-gray-400 font-poppins">
                      अपने खाते तक पहुंचने के लिए अपने क्रेडेंशियल्स दर्ज करें
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <AtSign className="h-4 w-4 mr-2 text-revithalize-green" />
                            ईमेल (Email)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                placeholder="name@example.com" 
                                className="bg-gray-800 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-green"
                              />
                              <AtSign className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
                            पासवर्ड (Password)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type="password" 
                                className="bg-gray-800 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-green"
                              />
                              <Key className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
                        onClick={() => {}} // Would handle password reset
                      >
                        पासवर्ड भूल गए? (Forgot password?)
                      </button>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-revithalize-green to-revithalize-green/80 hover:to-revithalize-green text-black font-medium font-poppins h-11 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          लॉग इन हो रहा है... (Logging in...)
                        </div>
                      ) : (
                        "लॉग इन करें (Login)"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register" className="animate-fade-in">
            <Card className="bg-gray-900 border-gray-800 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-revithalize-blue to-transparent"></div>
              
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)}>
                  <CardHeader>
                    <CardTitle className="text-white font-poppins">खाता बनाएँ (Create an account)</CardTitle>
                    <CardDescription className="text-gray-400 font-poppins">
                      अपना खाता बनाने के लिए अपना विवरण दर्ज करें
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel className="text-white font-poppins flex items-center">
                              <User className="h-4 w-4 mr-2 text-revithalize-blue" />
                              पहला नाम (First name)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                className="bg-gray-800 border-gray-700 text-white transition-all focus:border-revithalize-blue"
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
                              उपनाम (Last name)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                className="bg-gray-800 border-gray-700 text-white transition-all focus:border-revithalize-blue"
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
                            <AtSign className="h-4 w-4 mr-2 text-revithalize-blue" />
                            ईमेल (Email)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type="email" 
                                placeholder="name@example.com"
                                className="bg-gray-800 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <AtSign className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
                            <MapPin className="h-4 w-4 mr-2 text-revithalize-blue" />
                            शहर (City)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                placeholder="दिल्ली, मुंबई, बैंगलोर, आदि" 
                                className="bg-gray-800 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <MapPin className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-white font-poppins flex items-center">
                            <Shield className="h-4 w-4 mr-2 text-revithalize-blue" />
                            पासवर्ड (Password)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Shield className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">पासवर्ड स्ट्रेंथ (Password strength)</span>
                              <span 
                                className={cn(
                                  "text-xs font-semibold",
                                  passwordStrength < 40 ? "text-red-400" : 
                                  passwordStrength < 70 ? "text-yellow-400" : 
                                  "text-green-400"
                                )}
                              >
                                {passwordStrength < 40 ? "कमज़ोर (Weak)" : 
                                 passwordStrength < 70 ? "मध्यम (Medium)" : 
                                 "मजबूत (Strong)"}
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
                            पासवर्ड की पुष्टि करें (Confirm Password)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type="password"
                                className="bg-gray-800 border-gray-700 text-white pl-10 transition-all focus:border-revithalize-blue"
                              />
                              <Shield className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-revithalize-blue to-revithalize-blue/80 hover:to-revithalize-blue text-black font-medium font-poppins h-11 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          खाता बना रहा है... (Creating account...)
                        </div>
                      ) : (
                        "खाता बनाएं (Create account)"
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-sm text-gray-500 animate-fade-in">
          <p>© 2025 RevithalizeEV • भारत में बनाया गया (Made in India) 🇮🇳</p>
        </div>
      </div>
    </div>
  );
}
