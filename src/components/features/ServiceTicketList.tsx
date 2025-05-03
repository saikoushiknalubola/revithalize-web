
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, FileDown, Clock } from 'lucide-react';
import { ServiceTicket } from '@/types/ServiceTicket';
import { generateTicketPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

export function ServiceTicketList() {
  const [tickets, setTickets] = useState<ServiceTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading tickets from an API
    const loadTickets = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        // Get tickets from localStorage
        const storedTickets = JSON.parse(localStorage.getItem('serviceTickets') || '[]');
        setTickets(storedTickets);
        setIsLoading(false);
      }, 800);
    };
    
    loadTickets();
  }, []);

  const handleDownloadPDF = (ticket: ServiceTicket) => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = userData.fullName || userData.name || 'Customer';
    
    // Vehicle details would typically come from an API or state
    const vehicleDetails = {
      model: 'Hero Honda Passion AP02SK2409',
      batteryType: '51.2V 45Ah Lithium-Ion',
      range: 'Up to 110 km'
    };

    // Generate PDF blob
    const pdfBlob = generateTicketPDF(ticket, userName, vehicleDetails);
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `service-ticket-${ticket.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('PDF downloaded successfully');
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      'open': 'bg-yellow-400',
      'in_progress': 'bg-blue-400',
      'resolved': 'bg-green-400',
      'closed': 'bg-gray-400',
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <FileText className="mr-2 h-5 w-5 text-revithalize-green" />
          My Service Tickets
        </CardTitle>
        <CardDescription>View and manage your existing service tickets</CardDescription>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-8 w-8 rounded-full border-2 border-t-revithalize-green border-r-transparent animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading your tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg">
            <FileText className="mx-auto h-10 w-10 text-gray-500 mb-3" />
            <h3 className="text-gray-300 font-medium mb-1">No tickets found</h3>
            <p className="text-gray-500 text-sm mb-4">You haven't created any service tickets yet.</p>
            <Button 
              variant="outline" 
              className="border-gray-700 text-white hover:bg-gray-700"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Create Your First Ticket
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div 
                key={ticket.id} 
                className="border border-gray-800 rounded-lg p-4 hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium mb-1">{ticket.title}</h3>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="font-mono">{ticket.id}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(ticket.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(ticket.status)} mr-2`}></div>
                    <span className="text-sm text-gray-300 capitalize">
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">{ticket.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 hover:bg-gray-700 text-xs"
                    onClick={() => handleDownloadPDF(ticket)}
                  >
                    <FileDown className="h-3 w-3 mr-1" />
                    Download PDF
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-revithalize-green hover:text-revithalize-green hover:bg-revithalize-green/10 text-xs"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
