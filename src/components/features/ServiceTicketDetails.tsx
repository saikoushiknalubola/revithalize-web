
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
import { Clock, Tag, AlertTriangle, Clipboard, Calendar, FileDown, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
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

  // Mock comments for the ticket
  const ticketComments = [
    {
      id: 1,
      author: "Service Center",
      date: new Date(new Date(ticket.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
      message: "We've received your ticket and are looking into the issue. A technician will be assigned shortly."
    },
    {
      id: 2,
      author: "Technician Ramesh",
      date: new Date(new Date(ticket.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      message: "I've been assigned to your case. Based on the description, it sounds like a potential cell balancing issue. We'll need to run diagnostics when you bring in the vehicle."
    }
  ];

  // Mock timeline events based on ticket status
  const getTimelineEvents = () => {
    const baseEvents = [
      {
        label: "Ticket Created",
        date: ticket.createdAt,
        icon: <Clipboard className="h-4 w-4 text-revithalize-green" />,
        color: "bg-revithalize-green"
      },
    ];
    
    if (ticket.status === 'in_progress') {
      baseEvents.push({
        label: "Technician Assigned",
        date: new Date(new Date(ticket.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        icon: <MessageSquare className="h-4 w-4 text-blue-400" />,
        color: "bg-blue-400"
      });
    }
    
    if (ticket.status === 'resolved') {
      baseEvents.push({
        label: "Technician Assigned",
        date: new Date(new Date(ticket.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        icon: <MessageSquare className="h-4 w-4 text-blue-400" />,
        color: "bg-blue-400"
      });
      baseEvents.push({
        label: "Issue Resolved",
        date: new Date(new Date(ticket.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        color: "bg-green-400"
      });
    }
    
    if (ticket.status === 'closed') {
      baseEvents.push({
        label: "Technician Assigned",
        date: new Date(new Date(ticket.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        icon: <MessageSquare className="h-4 w-4 text-blue-400" />,
        color: "bg-blue-400"
      });
      baseEvents.push({
        label: "Issue Resolved",
        date: new Date(new Date(ticket.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        icon: <CheckCircle className="h-4 w-4 text-green-400" />,
        color: "bg-green-400"
      });
      baseEvents.push({
        label: "Ticket Closed",
        date: new Date(new Date(ticket.createdAt).getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        icon: <XCircle className="h-4 w-4 text-gray-400" />,
        color: "bg-gray-400"
      });
    }
    
    return baseEvents;
  };

  const timelineEvents = getTimelineEvents();

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
          <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
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
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Status</h4>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(ticket.status)} mr-2`}></div>
                <span className="text-white capitalize">
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Priority</h4>
              <div className="flex items-center">
                {getPriorityIcon(ticket.priority)}
                <span className="text-white capitalize ml-2">
                  {ticket.priority}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Category</h4>
              <span className="text-white capitalize">
                {ticket.category.replace('_', ' ')}
              </span>
            </div>
            
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Created At</h4>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-white">{formatDate(ticket.createdAt)}</span>
              </div>
            </div>
          </div>
          
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
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
          
          <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Timeline</h4>
            <div className="space-y-3">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full ${event.color}`}>
                      {event.icon}
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-700 ml-3 -mt-1 mx-auto"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-white text-sm font-medium">{event.label}</p>
                    <p className="text-gray-400 text-xs">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800/70 p-4 rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-gray-400 mb-4">Comments</h4>
            <div className="space-y-4">
              {ticketComments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-white">{comment.author}</span>
                    <span className="text-xs text-gray-400">{formatDate(comment.date)}</span>
                  </div>
                  <p className="text-sm text-gray-300">{comment.message}</p>
                </div>
              ))}
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
