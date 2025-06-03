
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, CreditCard, Crown, MessageCircle, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Expired';
  revenue: number;
  joinDate: Date;
  vehicles: number;
}

export function CustomerManagement() {
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      plan: 'Pro',
      status: 'Active',
      revenue: 24999,
      joinDate: new Date('2024-01-15'),
      vehicles: 2
    },
    {
      id: '2',
      name: 'Priya Sharma',
      plan: 'Enterprise',
      status: 'Active',
      revenue: 99999,
      joinDate: new Date('2024-02-20'),
      vehicles: 5
    },
    {
      id: '3',
      name: 'Amit Patel',
      plan: 'Basic',
      status: 'Trial',
      revenue: 0,
      joinDate: new Date('2024-03-01'),
      vehicles: 1
    }
  ]);

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.revenue, 0);
  const activeCustomers = customers.filter(c => c.status === 'Active').length;

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Basic': return 'text-blue-400 bg-blue-400/20';
      case 'Pro': return 'text-green-400 bg-green-400/20';
      case 'Enterprise': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Trial': return 'text-amber-400';
      case 'Expired': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Users className="mr-3 h-6 w-6 text-revithalize-green" />
          Customer Management
          <div className="ml-auto bg-gradient-to-r from-revithalize-green to-revithalize-blue px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">CRM</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Revenue</div>
                <div className="text-lg font-bold text-white">₹{totalRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Users className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Customers</div>
                <div className="text-lg font-bold text-white">{activeCustomers}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Growth Rate</div>
                <div className="text-lg font-bold text-white">+23.5%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recent Customers</h3>
            <Button size="sm" className="bg-revithalize-green/20 hover:bg-revithalize-green/30 text-revithalize-green border-revithalize-green/50">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          {customers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-4 border border-gray-600/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-revithalize-green/20 p-2 rounded-lg">
                    <Users className="h-4 w-4 text-revithalize-green" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-400">
                      {customer.vehicles} vehicle{customer.vehicles > 1 ? 's' : ''} • 
                      Joined {customer.joinDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-white font-medium">₹{customer.revenue.toLocaleString()}</div>
                    <div className={cn("text-sm", getStatusColor(customer.status))}>
                      {customer.status}
                    </div>
                  </div>
                  <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getPlanColor(customer.plan))}>
                    {customer.plan}
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-gray-400 hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-blue-600/80 to-blue-500/80 hover:from-blue-500/80 hover:to-blue-400/80 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Demo
          </Button>
          <Button className="bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-500/80 hover:to-purple-400/80 text-white">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
