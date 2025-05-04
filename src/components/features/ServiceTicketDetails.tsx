
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Clock, Tag, AlertTriangle, Clipboard, Calendar, FileDown } from 'lucide-react';
import { ServiceTicket } from '@/types/ServiceTicket';
import { generateTicketPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

interface ServiceTicketDetailsProps {
  ticket: ServiceTicket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceTicketDetails({ ticket, open, onOpenChange }: ServiceTicketDetailsProps) {
  if (!ticket) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityIcon = (priority: string) => {
    switch(priority) {
      case 'urgent':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'medium':
        return <Tag className="h-4 w-4 text-yellow-400" />;
      case 'low':
        return <Tag className="h-4 w-4 text-green-400" />;
      default:
        return <Tag className="h-4 w-4 text-gray-400" />;
    }
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

  const handleDownloadPDF = () => {
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

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl font-bold flex items-center">
            <Clipboard className="mr-2 h-5 w-5 text-revithalize-green" />
            Ticket Details
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            Service ticket information and status
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gray-800/70 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-2">{ticket.title}</h3>
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <span className="font-mono">{ticket.id}</span>
              <span className="mx-2">•</span>
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/70 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Status</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(ticket.status)} mr-2`}></div>
                <span className="text-white capitalize">
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Priority</h4>
              <div className="flex items-center">
                {getPriorityIcon(ticket.priority)}
                <span className="text-white capitalize ml-2">
                  {ticket.priority}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Category</h4>
              <span className="text-white capitalize">
                {ticket.category.replace('_', ' ')}
              </span>
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Created At</h4>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-white">{formatDate(ticket.createdAt)}</span>
              </div>
            </div>
          </div>
          
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="bg-gray-800/70 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Attachments</h4>
              <div className="flex flex-wrap gap-2">
                {ticket.attachments.map((attachment, index) => (
                  <div key={index} className="bg-gray-700 px-3 py-1 rounded-md text-sm text-white">
                    {attachment}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-gray-800/70 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Timeline</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-revithalize-green rounded-full"></div>
                  <div className="w-0.5 h-8 bg-gray-700 ml-0.75 -mt-1 mx-auto"></div>
                </div>
                <div className="ml-3">
                  <p className="text-white text-sm">Ticket Created</p>
                  <p className="text-gray-400 text-xs">{formatDate(ticket.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div className="ml-3">
                  <p className="text-white text-sm">Current Status: <span className="capitalize">{ticket.status.replace('_', ' ')}</span></p>
                  <p className="text-gray-400 text-xs">{formatDate(ticket.updatedAt || ticket.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleDownloadPDF}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download as PDF
          </Button>
          <AlertDialogAction className="bg-revithalize-green hover:bg-green-600 text-black font-medium">
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
