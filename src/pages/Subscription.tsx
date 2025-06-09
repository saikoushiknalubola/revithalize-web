
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, Star, Zap, Shield, Cpu, TrendingUp, Users, Clock, CreditCard, Gift, ArrowRight, Download, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { generateInvoicePDF } from '@/utils/invoiceGenerator';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: '₹99',
    period: '/month',
    yearlyPrice: '₹1,299',
    description: 'Essential features for EV management',
    features: [
      'Real-time battery monitoring',
      'Advanced analytics dashboard',
      'Mobile app access',
      'Email support',
      'Range prediction',
      'Charging reminders',
      'Predictive maintenance AI',
      'Energy optimization',
      'Priority support',
      'Custom alerts & notifications'
    ],
    color: 'from-revithalize-green to-revithalize-blue',
    iconColor: 'text-revithalize-green',
    buttonStyle: 'bg-gradient-to-r from-revithalize-green to-revithalize-blue hover:opacity-90'
  }
];

const currentPlan = {
  name: 'Monthly Plan',
  nextBilling: '2024-07-15',
  amount: '₹99',
  status: 'Active'
};

const paymentMethods = [
  { 
    name: 'Visa', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
    type: 'card'
  },
  { 
    name: 'Mastercard', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    type: 'card'
  },
  { 
    name: 'RuPay', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg',
    type: 'card'
  },
  { 
    name: 'UPI', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg',
    type: 'digital'
  },
  { 
    name: 'Google Pay', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg',
    type: 'digital'
  },
  { 
    name: 'PhonePe', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/PhonePe_Logo.svg',
    type: 'digital'
  },
  { 
    name: 'Paytm', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg',
    type: 'digital'
  },
  { 
    name: 'Net Banking', 
    logo: 'https://cdn-icons-png.flaticon.com/512/4208/4208479.png',
    type: 'banking'
  }
];

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const downloadInvoice = () => {
    const invoiceData = {
      invoiceNumber: 'INV-2024-001',
      date: new Date().toLocaleDateString('en-GB'),
      customer: 'John Doe',
      email: 'john.doe@example.com',
      plan: 'Monthly Subscription Plan',
      amount: currentPlan.amount,
      nextBilling: new Date(currentPlan.nextBilling).toLocaleDateString('en-GB'),
      billingPeriod: 'Jan 15 - Feb 15, 2024'
    };
    
    try {
      const pdfBlob = generateInvoicePDF(invoiceData);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Error generating invoice. Please try again.');
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-revithalize-green/10 border border-revithalize-green/20 rounded-full">
              <Crown className="h-4 w-4 text-revithalize-green mr-2" />
              <span className="text-revithalize-green text-sm font-medium">Premium EV Management</span>
            </div>
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Subscription Management
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of electric vehicle management with our comprehensive suite of AI-powered tools and analytics.
            </p>
          </div>

          {/* Current Subscription Status Card */}
          <Card className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 border border-revithalize-green/30 shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-white flex items-center">
                <div className="p-3 bg-revithalize-green/20 rounded-lg mr-4">
                  <Crown className="h-8 w-8 text-revithalize-green" />
                </div>
                Active Subscription
                <div className="ml-auto">
                  <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Live</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm uppercase tracking-wide">Current Plan</p>
                  <p className="text-2xl font-bold text-revithalize-green">{currentPlan.name}</p>
                  <p className="text-gray-300 text-sm">Premium features included</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm uppercase tracking-wide">Status</p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-white font-medium">{currentPlan.status}</p>
                  </div>
                  <p className="text-gray-300 text-sm">Auto-renewal enabled</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm uppercase tracking-wide">Next Billing</p>
                  <p className="text-white font-medium text-lg">{new Date(currentPlan.nextBilling).toLocaleDateString()}</p>
                  <p className="text-gray-300 text-sm">Automatic payment</p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm uppercase tracking-wide">Monthly Cost</p>
                  <p className="text-white font-bold text-2xl">{currentPlan.amount}</p>
                  <p className="text-gray-300 text-sm">Excl. taxes</p>
                </div>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="bg-revithalize-green hover:bg-revithalize-green/90 text-black font-semibold px-6 py-3 text-lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Manage Billing
                </Button>
                <Button 
                  variant="outline" 
                  className="border-revithalize-green/50 text-revithalize-green hover:bg-revithalize-green hover:text-black font-semibold px-6 py-3 text-lg bg-transparent"
                  onClick={downloadInvoice}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Invoice
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white font-semibold px-6 py-3 text-lg bg-transparent"
                >
                  <Gift className="h-5 w-5 mr-2" />
                  Refer Friends
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing Toggle */}
          <div className="flex justify-center">
            <div className="bg-gray-800/80 p-2 rounded-xl border border-gray-700/50 backdrop-blur-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={cn(
                  "px-8 py-3 rounded-lg transition-all font-semibold text-lg",
                  billingCycle === 'monthly' 
                    ? "bg-revithalize-green text-black shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                )}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={cn(
                  "px-8 py-3 rounded-lg transition-all relative font-semibold text-lg",
                  billingCycle === 'yearly' 
                    ? "bg-revithalize-green text-black shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                )}
              >
                Annual Billing
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Plan */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-lg w-full"
            >
              <Card className="border-2 border-revithalize-green/50 bg-gradient-to-br from-gray-800/90 to-gray-900/90 shadow-2xl shadow-revithalize-green/20 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-revithalize-green/5 to-revithalize-blue/5" />
                
                <CardHeader className="relative z-10 pt-8 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl text-white flex items-center">
                      <div className="p-3 rounded-xl mr-4 bg-gradient-to-br from-revithalize-green to-revithalize-blue shadow-lg">
                        <Crown className="h-6 w-6 text-white" />
                      </div>
                      {plans[0].name}
                    </CardTitle>
                    <div className="bg-revithalize-green/20 text-revithalize-green px-4 py-2 rounded-full text-sm font-bold border border-revithalize-green/30">
                      Active
                    </div>
                  </div>
                  <CardDescription className="text-gray-300 text-lg">
                    {plans[0].description}
                  </CardDescription>
                  <div className="mt-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-5xl font-bold text-white">
                        {billingCycle === 'yearly' ? plans[0].yearlyPrice : plans[0].price}
                      </span>
                      <span className="text-2xl text-gray-400">
                        {billingCycle === 'yearly' ? '/year' : plans[0].period}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="mt-2 inline-flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 font-medium">Save ₹889 annually</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10 pt-0">
                  <ul className="space-y-4 mb-8">
                    {plans[0].features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-revithalize-green mt-1 flex-shrink-0" />
                        <span className="text-gray-200 text-base leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-revithalize-green to-revithalize-blue hover:opacity-90 text-black font-bold py-4 text-lg shadow-xl transition-all duration-300"
                    disabled={billingCycle === 'monthly'}
                  >
                    {billingCycle === 'monthly' ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Current Plan
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-5 w-5 mr-2" />
                        Upgrade to Annual
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Features Showcase */}
          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 shadow-2xl backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl text-white flex items-center">
                <Star className="h-8 w-8 mr-4 text-yellow-400" />
                Premium Features Included
              </CardTitle>
              <CardDescription className="text-xl text-gray-300">
                Everything you need for comprehensive EV management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Zap className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Core Features</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Real-time monitoring</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Mobile app access</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Range prediction</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Advanced Analytics</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Predictive maintenance</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Energy optimization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Custom reports</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Performance insights</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Cpu className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">AI Features</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Smart alerts</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Usage optimization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Health predictions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Route planning</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Shield className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Support & Security</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Data security</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Regular updates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>24/7 monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Security */}
          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 shadow-2xl backdrop-blur-sm">
            <CardContent className="pt-8">
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="p-4 bg-revithalize-green/20 rounded-full">
                    <Shield className="h-12 w-12 text-revithalize-green" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold text-white">Bank-Level Security</h3>
                    <p className="text-gray-300 text-lg">256-bit SSL encryption & PCI compliance</p>
                  </div>
                </div>
                
                <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
                  Your payment information is protected with industry-leading security measures. 
                  We support all major payment methods across India for maximum convenience.
                </p>
                
                <div className="space-y-6">
                  <div className="text-lg font-semibold text-white">Accepted Payment Methods</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="group">
                        <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-200">
                          <div className="h-12 flex items-center justify-center">
                            <img 
                              src={method.logo} 
                              alt={method.name}
                              className="max-h-8 max-w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>';
                              }}
                            />
                          </div>
                        </div>
                        <span className="text-sm text-gray-400 text-center block mt-2 group-hover:text-white transition-colors">
                          {method.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center items-center space-x-8 pt-6 border-t border-gray-700/50">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="font-medium">SSL Secured</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Check className="h-5 w-5 text-green-400" />
                    <span className="font-medium">PCI Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Shield className="h-5 w-5 text-green-400" />
                    <span className="font-medium">Zero Storage</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
