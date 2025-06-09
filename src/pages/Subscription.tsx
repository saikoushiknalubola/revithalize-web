import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, Star, Zap, Shield, Cpu, TrendingUp, Users, Clock, CreditCard, Gift, ArrowRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { generateInvoicePDF } from '@/utils/invoiceGenerator';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: '₹99',
    period: '/month',
    yearlyPrice: '₹1299',
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
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
            Subscription Plan
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Simple, transparent pricing for your electric vehicle management needs. 
            Unlock powerful insights and advanced features to optimize your EV experience.
          </p>
        </div>

        {/* Current Subscription Status */}
        <Card className="bg-gray-900/50 border-revithalize-green/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Crown className="h-6 w-6 mr-3 text-revithalize-green" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-400 text-sm">Plan</p>
                <p className="text-xl font-bold text-revithalize-green">{currentPlan.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white font-medium">{currentPlan.status}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Next Billing</p>
                <p className="text-white font-medium">{new Date(currentPlan.nextBilling).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Amount</p>
                <p className="text-white font-medium">{currentPlan.amount}/month</p>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <Button className="bg-revithalize-green hover:bg-revithalize-green/90">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Billing
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={downloadInvoice}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-800/50 p-1 rounded-lg backdrop-blur-sm">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-6 py-2 rounded-md transition-all",
                billingCycle === 'monthly' 
                  ? "bg-revithalize-green text-black font-medium" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={cn(
                "px-6 py-2 rounded-md transition-all relative",
                billingCycle === 'yearly' 
                  ? "bg-revithalize-green text-black font-medium" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
            className="relative max-w-md w-full"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-revithalize-green to-revithalize-blue text-black px-4 py-2 rounded-full text-sm font-medium">
                Best Value
              </div>
            </div>
            
            <Card className="border-revithalize-green/50 bg-gray-900/50 backdrop-blur-sm shadow-xl shadow-revithalize-green/20">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-revithalize-green to-revithalize-blue rounded-lg" />
              
              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <div className="p-2 rounded-lg mr-3 bg-gradient-to-br from-revithalize-green to-revithalize-blue">
                      <Crown className="h-5 w-5 text-white" />
                    </div>
                    {plans[0].name}
                  </CardTitle>
                  <div className="bg-revithalize-green/20 text-revithalize-green px-2 py-1 rounded-full text-xs">
                    Current
                  </div>
                </div>
                <CardDescription className="text-gray-400">
                  {plans[0].description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">
                    {billingCycle === 'yearly' ? plans[0].yearlyPrice : plans[0].price}
                  </span>
                  <span className="text-gray-400">
                    {billingCycle === 'yearly' ? '/year' : plans[0].period}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-400 mt-1">
                      Save 25% with yearly billing
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <ul className="space-y-3 mb-6">
                  {plans[0].features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-revithalize-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-gray-300" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Showcase */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="h-6 w-6 mr-3 text-yellow-400" />
              What's Included
            </CardTitle>
            <CardDescription className="text-gray-400">
              Comprehensive EV management features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                  Core Features
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Real-time monitoring</li>
                  <li>• Mobile app access</li>
                  <li>• Basic analytics</li>
                  <li>• Range prediction</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
                  Advanced Analytics
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Predictive maintenance</li>
                  <li>• Energy optimization</li>
                  <li>• Custom reports</li>
                  <li>• Performance insights</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-blue-400" />
                  AI Features
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Smart alerts</li>
                  <li>• Usage optimization</li>
                  <li>• Health predictions</li>
                  <li>• Route planning</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  Support
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Priority support</li>
                  <li>• Data security</li>
                  <li>• Regular updates</li>
                  <li>• 24/7 monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Security */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Shield className="h-12 w-12 text-revithalize-green mx-auto" />
              <h3 className="text-xl font-semibold text-white">Secure & Encrypted</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Your payment information is protected with bank-level security. 
                We accept all major credit cards, UPI, and net banking.
              </p>
              <div className="flex justify-center items-center space-x-6 mt-6">
                <div className="text-gray-400 text-sm">Accepted payments:</div>
                <div className="flex space-x-4">
                  <div className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">Visa</div>
                  <div className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">MasterCard</div>
                  <div className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">UPI</div>
                  <div className="bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">NetBanking</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
