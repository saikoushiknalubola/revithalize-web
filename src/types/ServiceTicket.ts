
export interface ServiceTicket {
  id: string;
  userId: string;
  vehicleId: string;
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string | null;
  attachments?: string[];
}

export type TicketCategory = 
  | 'battery'
  | 'charging'
  | 'electric_motor'
  | 'controller'
  | 'mechanical'
  | 'software'
  | 'other';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface ServiceTicketFormData {
  title: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  vehicleId?: string;
}
