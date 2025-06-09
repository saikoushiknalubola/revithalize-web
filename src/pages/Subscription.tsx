
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Check, Star, Zap, Shield, Cpu, TrendingUp, Users, Clock, CreditCard, Gift, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '₹299',
    period: '/month',
    description: 'Essential features for individual users',
    features: [
      'Real-time battery monitoring',
      'Basic analytics dashboard',
      'Mobile app access',
      'Email support',
      'Range prediction',
      'Charging reminders'
    ],
    color: 'from-gray-600 to-gray-700',
    iconColor: 'text-gray-400',
    buttonStyle: 'bg-gray-600 hover:bg-gray-700'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹599',
    period: '/month',
    description: 'Advanced features for power users',
    features: [
      'Everything in Basic',
      'Advanced analytics & reports',
      'Predictive maintenance AI',
      'Energy optimization',
      'Priority support',
      'Custom alerts & notifications',
      'Fleet management (up to 5 vehicles)',
      'Carbon footprint tracking'
    ],
    popular: true,
    color: 'from-revithalize-green to-revithalize-blue',
    iconColor: 'text-revithalize-green',
    buttonStyle: 'bg-gradient-to-r from-revithalize-green to-revithalize-blue hover:opacity-90'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '₹1,299',
    period: '/month',
    description: 'Complete solution for businesses',
    features: [
      'Everything in Pro',
      'Unlimited fleet management',
      'Advanced AI insights',
      'Custom integrations',
      'Dedicated account manager',
      '24/7 phone support',
      'White-label options',
      'API access',
      'Custom reporting',
      'Multi-location support'
    ],
    color: 'from-purple-600 to-indigo-700',
    iconColor: 'text-purple-400',
    buttonStyle: 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-90'
  }
];

const currentPlan = {
  name: 'Pro',
  nextBilling: '2024-07-15',
  amount: '₹599',
  status: 'Active'
};

export default function Subscription() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
            Subscription Plans
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your electric vehicle management needs. 
            Unlock powerful insights and advanced features to optimize your EV experience.
          </p>
        </div>

        {/* Current Subscription Status */}
        <Card className="bg-gradient-to-r from-revithalize-green/10 to-revithalize-blue/10 border-revithalize-green/30">
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
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                Download Invoice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-800 p-1 rounded-lg">
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
                20% off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-revithalize-green to-revithalize-blue text-black px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card className={cn(
                "relative overflow-hidden transition-all duration-300 hover:scale-105",
                plan.popular 
                  ? "border-revithalize-green/50 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl shadow-revithalize-green/20" 
                  : "bg-gradient-to-b from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600"
              )}>
                <div className={cn(
                  "absolute inset-0 opacity-10 bg-gradient-to-br",
                  plan.color
                )} />
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <div className={cn("p-2 rounded-lg mr-3 bg-gradient-to-br", plan.color)}>
                        <Crown className={cn("h-5 w-5", plan.iconColor)} />
                      </div>
                      {plan.name}
                    </CardTitle>
                    {plan.name === currentPlan.name && (
                      <div className="bg-revithalize-green/20 text-revithalize-green px-2 py-1 rounded-full text-xs">
                        Current
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-gray-400">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-white">
                      {billingCycle === 'yearly' ? 
                        `₹${Math.round(parseInt(plan.price.replace('₹', '')) * 12 * 0.8)}` : 
                        plan.price
                      }
                    </span>
                    <span className="text-gray-400">
                      {billingCycle === 'yearly' ? '/year' : plan.period}
                    </span>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-400 mt-1">
                        Save 20% with yearly billing
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-revithalize-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={cn(
                      "w-full",
                      plan.name === currentPlan.name 
                        ? "bg-gray-600 hover:bg-gray-700 text-gray-300" 
                        : plan.buttonStyle
                    )}
                    disabled={plan.name === currentPlan.name}
                  >
                    {plan.name === currentPlan.name ? (
                      'Current Plan'
                    ) : (
                      <>
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade Now'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Star className="h-6 w-6 mr-3 text-yellow-400" />
              Feature Comparison
            </CardTitle>
            <CardDescription className="text-gray-400">
              Compare features across all subscription plans
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
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  Fleet Management
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Multi-vehicle support</li>
                  <li>• Driver management</li>
                  <li>• Route optimization</li>
                  <li>• Cost tracking</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  Support & Security
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Priority support</li>
                  <li>• Data encryption</li>
                  <li>• API access</li>
                  <li>• Custom integrations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2">Can I change my plan anytime?</h3>
                <p className="text-gray-400 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400 text-sm">We accept all major credit cards, debit cards, UPI, and net banking for Indian customers.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Is there a free trial available?</h3>
                <p className="text-gray-400 text-sm">Yes, new users get a 14-day free trial of the Pro plan with full access to all features.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
