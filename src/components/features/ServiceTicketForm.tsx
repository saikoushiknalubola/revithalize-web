
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { FileText, Loader2 } from 'lucide-react';
import { ServiceTicket, ServiceTicketFormData, TicketCategory, TicketPriority } from '@/types/ServiceTicket';
import { generateTicketPDF } from '@/utils/pdfGenerator';

export function ServiceTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceTicketFormData>({
    title: '',
    description: '',
    category: 'battery',
    priority: 'medium',
  });
  const [ticket, setTicket] = useState<ServiceTicket | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to create ticket
    setTimeout(() => {
      // Generate a random ID
      const newTicket: ServiceTicket = {
        id: `TKT-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        userId: localStorage.getItem('userId') || 'user-123',
        vehicleId: 'vehicle-001',
        title: formData.title,
        description: formData.description,
        category: formData.category as TicketCategory,
        priority: formData.priority as TicketPriority,
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: null,
      };

      setTicket(newTicket);
      setIsSubmitting(false);
      toast.success('Service ticket created successfully', {
        description: `Ticket #${newTicket.id} has been created and assigned to our team.`
      });

      // Save ticket to localStorage (simulating persistence)
      const existingTickets = JSON.parse(localStorage.getItem('serviceTickets') || '[]');
      localStorage.setItem('serviceTickets', JSON.stringify([...existingTickets, newTicket]));
    }, 1500);
  };

  const handleDownloadPDF = () => {
    if (!ticket) return;

    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = userData.fullName || userData.name || 'Customer';
    
    // Vehicle details would typically come from an API or state
    // Here we're using mock data
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
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white">Submit a Service Ticket</CardTitle>
        <CardDescription>Describe the issue you're experiencing with your EV</CardDescription>
      </CardHeader>
      
      {!ticket ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="battery">Battery Issues</SelectItem>
                    <SelectItem value="charging">Charging Problems</SelectItem>
                    <SelectItem value="electric_motor">Electric Motor</SelectItem>
                    <SelectItem value="controller">Controller Issues</SelectItem>
                    <SelectItem value="mechanical">Mechanical Problems</SelectItem>
                    <SelectItem value="software">Software/Firmware</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-white">Priority</Label>
                <Select 
                  value={formData.priority} 
                  onValueChange={(value) => handleSelectChange('priority', value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please provide details about the issue you're experiencing..."
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="bg-gray-800 border-gray-700 text-white resize-none"
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-revithalize-green hover:bg-green-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Ticket'
              )}
            </Button>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="space-y-6">
          <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
            <h3 className="text-green-500 text-lg font-medium mb-2">Ticket Successfully Created</h3>
            <p className="text-gray-300">Your ticket has been created and assigned to our team. We will contact you shortly.</p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-gray-800/60 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Ticket ID</p>
              <p className="text-white font-medium">{ticket.id}</p>
            </div>
            
            <div className="bg-gray-800/60 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Title</p>
              <p className="text-white font-medium">{ticket.title}</p>
            </div>
            
            <div className="bg-gray-800/60 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Status</p>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                <p className="text-white font-medium">Open</p>
              </div>
            </div>
            
            <div className="bg-gray-800/60 p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Description</p>
              <p className="text-white mt-1">{ticket.description}</p>
            </div>
          </div>
          
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleDownloadPDF}
          >
            <FileText className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-700 text-white hover:bg-gray-700"
            onClick={() => setTicket(null)}
          >
            Create Another Ticket
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
