
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { HelpCircle, MessageSquare, Phone, Mail, ExternalLink, FileText, ArrowRight, MapPin, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceTicketForm } from '@/components/features/ServiceTicketForm';
import { ServiceTicketList } from '@/components/features/ServiceTicketList';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

export default function Support() {
  const { isMobile } = useScreenSize();
  const [activeTab, setActiveTab] = useState('create-ticket');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleViewFaqs = () => {
    toast.info('Loading complete FAQ section', {
      description: 'Our knowledge base has been updated'
    });
  };

  const handleNavigateToMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  // All FAQs data grouped by category
  const faqsByCategory = {
    general: [
      { q: "What is EV retrofitting?", a: "Converting conventional vehicles to electric by replacing the internal combustion engine with an electric motor and battery system." },
      { q: "How long does retrofitting take?", a: "Typically 3-7 days depending on the vehicle model and complexity." },
      { q: "What range can I expect?", a: "Most retrofits provide 80-150 km range, depending on battery capacity and vehicle weight." },
      { q: "How much does retrofitting cost?", a: "Our retrofitting solutions start from ₹45,000 and vary based on the chosen battery capacity and features." },
    ],
    technical: [
      { q: "What type of batteries do you use?", a: "We use high-quality Lithium-Ion and LFP (Lithium Iron Phosphate) batteries that offer excellent energy density and longer lifespan." },
      { q: "Can any vehicle be retrofitted?", a: "Most two-wheelers and three-wheelers can be retrofitted. The feasibility depends on the vehicle's condition, age, and structural integrity." },
      { q: "What motor power do you offer?", a: "We offer motors ranging from 1.2 kW to 3.5 kW depending on your vehicle type and performance requirements." },
      { q: "How many charging cycles will the battery last?", a: "Our batteries are designed to maintain over 80% capacity after 800-1000 charge cycles, typically lasting 5-7 years with normal use." },
    ],
    maintenance: [
      { q: "How often does my retrofitted EV need servicing?", a: "We recommend a basic check-up every 3 months and a comprehensive service every 6 months." },
      { q: "What maintenance does an electric motor require?", a: "Electric motors require significantly less maintenance than combustion engines. Regular inspections of electrical connections and cooling systems are advisable." },
      { q: "How do I maintain the battery?", a: "Avoid complete discharge, keep away from extreme temperatures, and follow the recommended charging schedule in your user manual." },
      { q: "What is the warranty on retrofitted components?", a: "We offer a 3-year warranty on the motor and controller, and a 2-year warranty on the battery pack, subject to proper maintenance." },
    ],
    charging: [
      { q: "How long does it take to charge?", a: "A full charge typically takes 3-4 hours with our standard charger, and as little as 1 hour with our fast charging option." },
      { q: "Can I use any power outlet to charge?", a: "Yes, our standard chargers work with regular 230V household outlets. We also offer specialized charging solutions for faster charging." },
      { q: "How much does it cost to fully charge?", a: "A full charge costs approximately ₹15-25 depending on your local electricity rates, making it about 10 times cheaper than petrol." },
      { q: "Is there a mobile app for monitoring charging?", a: "Yes, our ReVithalize app allows you to monitor charging status, battery health, and set charging schedules remotely." },
    ],
  };

  // Flatten all FAQs for search functionality
  const allFaqs = Object.values(faqsByCategory).flat();
  
  // Filter FAQs based on search term
  const filteredFaqs = searchTerm 
    ? allFaqs.filter(faq => 
        faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFaqs;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6 pb-16 md:pb-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.header variants={itemVariants}>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">Support Center</h1>
          <p className="text-gray-400 mt-1">Get help with your EV retrofitting questions</p>
        </motion.header>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 max-w-[400px] bg-gray-800/50 mb-6">
              <TabsTrigger value="create-ticket" className="data-[state=active]:bg-revithalize-green data-[state=active]:text-black">
                Create Ticket
              </TabsTrigger>
              <TabsTrigger value="my-tickets" className="data-[state=active]:bg-revithalize-green data-[state=active]:text-black">
                My Tickets
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="create-ticket" className="space-y-6">
              <ServiceTicketForm />
            </TabsContent>
            
            <TabsContent value="my-tickets" className="space-y-6">
              <ServiceTicketList />
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={itemVariants}>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:border-gray-700 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <HelpCircle className="mr-2 h-5 w-5 text-revithalize-green" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Common questions about retrofitting</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search FAQs..."
                  className="pl-8 bg-gray-800 border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-none">
              {searchTerm ? (
                filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, i) => (
                      <AccordionItem key={i} value={`search-item-${i}`} className="border-b border-gray-800 last:border-0">
                        <AccordionTrigger className="text-white hover:no-underline py-3">
                          <span className="text-left">{faq.q}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400 text-sm">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-center text-gray-400 py-8">No FAQs found matching "{searchTerm}"</p>
                )
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="general" className="border-b border-gray-800">
                    <AccordionTrigger className="text-white font-medium hover:no-underline py-3">
                      General Questions
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 py-2">
                        {faqsByCategory.general.map((faq, i) => (
                          <div key={i} className="border-b border-gray-800 last:border-0 pb-3 last:pb-0">
                            <h3 className="font-medium text-white mb-1">{faq.q}</h3>
                            <p className="text-gray-400 text-sm">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="technical" className="border-b border-gray-800">
                    <AccordionTrigger className="text-white font-medium hover:no-underline py-3">
                      Technical Specifications
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 py-2">
                        {faqsByCategory.technical.map((faq, i) => (
                          <div key={i} className="border-b border-gray-800 last:border-0 pb-3 last:pb-0">
                            <h3 className="font-medium text-white mb-1">{faq.q}</h3>
                            <p className="text-gray-400 text-sm">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="maintenance" className="border-b border-gray-800">
                    <AccordionTrigger className="text-white font-medium hover:no-underline py-3">
                      Maintenance & Warranty
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 py-2">
                        {faqsByCategory.maintenance.map((faq, i) => (
                          <div key={i} className="border-b border-gray-800 last:border-0 pb-3 last:pb-0">
                            <h3 className="font-medium text-white mb-1">{faq.q}</h3>
                            <p className="text-gray-400 text-sm">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="charging" className="border-b border-gray-800">
                    <AccordionTrigger className="text-white font-medium hover:no-underline py-3">
                      Charging & Battery
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 py-2">
                        {faqsByCategory.charging.map((faq, i) => (
                          <div key={i} className="border-b border-gray-800 last:border-0 pb-3 last:pb-0">
                            <h3 className="font-medium text-white mb-1">{faq.q}</h3>
                            <p className="text-gray-400 text-sm">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
              
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <button 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-between group transition-all"
                  onClick={() => window.open('mailto:support@revithalize.com')}
                >
                  <span>Send Email</span>
                  <ArrowRight className="h-4 w-4 text-revithalize-green group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded-lg flex items-center justify-between group transition-all"
                  onClick={() => window.open('tel:+914045678901')}
                >
                  <span>Call Support</span>
                  <ArrowRight className="h-4 w-4 text-revithalize-green group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-revithalize-green" />
                Service Centers
              </CardTitle>
              <CardDescription>Find the nearest retrofitting center</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: "Warangal Main Center",
                    address: "Plot no 54/5-6 Nakkalagutta, Hanamakonda, Telangana 506001",
                    phone: "+91-76-71030069",
                    hours: "9 AM - 6 PM, Mon-Sat",
                    isHeadquarters: true
                  },
                  {
                    name: "Hitec City Center",
                    address: "Plot 123, Hitec City Main Road, Hyderabad, 500081",
                    phone: "+91-40-45678901",
                    hours: "9 AM - 6 PM, Mon-Sat",
                    isHeadquarters: false
                  },
                  {
                    name: "Banjara Hills Hub",
                    address: "Road No. 12, Banjara Hills, Hyderabad, 500034",
                    phone: "+91-40-87654321",
                    hours: "9 AM - 6 PM, Mon-Sat",
                    isHeadquarters: false
                  },
                  {
                    name: "Madhapur Workshop",
                    address: "1-2-3, Ayyappa Society, Madhapur, Hyderabad, 500081",
                    phone: "+91-40-23456789",
                    hours: "9 AM - 6 PM, Mon-Sat",
                    isHeadquarters: false
                  }
                ].map((center, i) => (
                  <motion.div 
                    key={i} 
                    className={`${center.isHeadquarters ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-revithalize-green/30' : 'bg-gray-800/50'} p-4 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start">
                      {center.isHeadquarters ? (
                        <div className="bg-revithalize-green/20 p-1.5 rounded-full mr-3">
                          <MapPin className="h-4 w-4 text-revithalize-green" />
                        </div>
                      ) : (
                        <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      )}
                      <div>
                        <h3 className="font-medium text-white mb-1 flex items-center">
                          {center.name}
                          {center.isHeadquarters && (
                            <span className="ml-2 text-xs bg-revithalize-green/20 text-revithalize-green px-2 py-0.5 rounded-full">
                              HQ
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">{center.address}</p>
                        <p className="text-gray-400 text-sm">{center.phone}</p>
                        <p className="text-gray-500 text-xs mb-3">{center.hours}</p>
                        <button 
                          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors flex items-center"
                          onClick={() => handleNavigateToMaps(center.address)}
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          Navigate
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
