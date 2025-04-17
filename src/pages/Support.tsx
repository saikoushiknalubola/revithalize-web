
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { HelpCircle, MessageSquare, Phone, Mail, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';

export default function Support() {
  const { isMobile } = useScreenSize();
  
  const handleSubmitTicket = () => {
    toast.success('Support ticket submitted', {
      description: 'We will get back to you within 24 hours'
    });
  };

  const handleViewFaqs = () => {
    toast.info('Loading complete FAQ section', {
      description: 'Our knowledge base has been updated'
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">Support Center</h1>
          <p className="text-gray-400 mt-1">Get help with your EV retrofitting questions</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <HelpCircle className="mr-2 h-5 w-5 text-revithalize-green" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Common questions about retrofitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { q: "What is EV retrofitting?", a: "Converting conventional vehicles to electric by replacing the internal combustion engine with an electric motor and battery system." },
                { q: "How long does retrofitting take?", a: "Typically 3-7 days depending on the vehicle model and complexity." },
                { q: "What range can I expect?", a: "Most retrofits provide 80-150 km range, depending on battery capacity and vehicle weight." },
                { q: "How much does retrofitting cost?", a: "Our retrofitting solutions start from ₹45,000 and vary based on the chosen battery capacity and features." },
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                  <h3 className="font-medium text-white mb-1">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
              <button 
                className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-between group transition-all"
                onClick={handleViewFaqs}
              >
                <span>View all FAQs</span>
                <span className="text-revithalize-green group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <MessageSquare className="mr-2 h-5 w-5 text-revithalize-green" />
                Contact Us
              </CardTitle>
              <CardDescription>Reach out to our support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-revithalize-green" />
                  <div>
                    <p className="text-white font-medium">Phone Support</p>
                    <p className="text-gray-400 text-sm">+91-40-45678901</p>
                    <p className="text-gray-500 text-xs">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-revithalize-green" />
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <p className="text-gray-400 text-sm">support@revithalize.com</p>
                    <p className="text-gray-500 text-xs">24/7 response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ExternalLink className="mr-3 h-5 w-5 text-revithalize-green" />
                  <div>
                    <p className="text-white font-medium">Social Media</p>
                    <p className="text-gray-400 text-sm">@revithalize</p>
                    <p className="text-gray-500 text-xs">Instagram, Twitter, LinkedIn</p>
                  </div>
                </div>
              </div>
              
              <button 
                className="w-full mt-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-between group transition-all"
                onClick={handleSubmitTicket}
              >
                <span>Submit a Ticket</span>
                <span className="text-revithalize-green group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Service Centers</CardTitle>
            <CardDescription>Find the nearest retrofitting center</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Hitec City Center",
                  address: "Plot 123, Hitec City Main Road, Hyderabad, 500081",
                  phone: "+91-40-45678901",
                  hours: "9 AM - 6 PM, Mon-Sat"
                },
                {
                  name: "Banjara Hills Hub",
                  address: "Road No. 12, Banjara Hills, Hyderabad, 500034",
                  phone: "+91-40-87654321",
                  hours: "9 AM - 6 PM, Mon-Sat"
                },
                {
                  name: "Madhapur Workshop",
                  address: "1-2-3, Ayyappa Society, Madhapur, Hyderabad, 500081",
                  phone: "+91-40-23456789",
                  hours: "9 AM - 6 PM, Mon-Sat"
                }
              ].map((center, i) => (
                <div key={i} className="bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                  <h3 className="font-medium text-white mb-1">{center.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{center.address}</p>
                  <p className="text-gray-400 text-sm">{center.phone}</p>
                  <p className="text-gray-500 text-xs">{center.hours}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
