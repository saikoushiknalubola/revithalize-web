
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ServiceTicket } from '@/types/ServiceTicket';

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo?: string;
}

const companyInfo: CompanyInfo = {
  name: 'ReVithalize Technologies',
  address: 'Plot 123, Hitec City Main Road, Hyderabad, 500081',
  phone: '+91-40-45678901',
  email: 'support@revithalize.com',
  website: 'www.revithalize.com',
};

export const generateTicketPDF = (ticket: ServiceTicket, userName: string, vehicleDetails: any): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Add header with company info
  doc.setFontSize(18);
  doc.setTextColor(0, 128, 0); // Green color for company name
  doc.text(companyInfo.name, pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(companyInfo.address, pageWidth / 2, 28, { align: 'center' });
  doc.text(`Tel: ${companyInfo.phone} | Email: ${companyInfo.email}`, pageWidth / 2, 34, { align: 'center' });
  doc.text(companyInfo.website, pageWidth / 2, 40, { align: 'center' });

  // Draw a horizontal line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(0.5);
  doc.line(15, 45, pageWidth - 15, 45);

  // Document title
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text('SERVICE TICKET', pageWidth / 2, 55, { align: 'center' });

  // Ticket details in a box
  doc.setFillColor(245, 245, 245);
  doc.rect(15, 60, pageWidth - 30, 25, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Ticket #: ${ticket.id}`, 20, 67);
  doc.text(`Date: ${today}`, pageWidth - 20, 67, { align: 'right' });
  doc.text(`Status: ${formatStatus(ticket.status)}`, 20, 74);
  doc.text(`Priority: ${formatPriority(ticket.priority)}`, pageWidth - 20, 74, { align: 'right' });
  doc.text(`Category: ${formatCategory(ticket.category)}`, 20, 81);
  
  // Customer information
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Customer Information', 15, 100);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Name: ${userName}`, 20, 110);
  doc.text(`User ID: ${ticket.userId}`, 20, 117);
  
  // Vehicle information
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Vehicle Information', 15, 135);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Vehicle: ${vehicleDetails.model || 'Hero Honda Passion'}`, 20, 145);
  doc.text(`Battery Type: ${vehicleDetails.batteryType || '51.2V 45Ah Lithium-Ion'}`, 20, 152);
  doc.text(`Range: ${vehicleDetails.range || 'Up to 110 km'}`, 20, 159);
  
  // Ticket details
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Ticket Details', 15, 175);
  
  // Add title and description
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Title:', 20, 185);
  doc.setFontSize(10);
  doc.text(ticket.title, 35, 185);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Description:', 20, 195);
  
  // Add multiline text support for description
  const description = doc.splitTextToSize(ticket.description, pageWidth - 40);
  doc.setFontSize(10);
  doc.text(description, 20, 205);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This document is computer-generated and does not require a signature.', pageWidth / 2, 280, { align: 'center' });

  // Return as blob
  return doc.output('blob');
};

// Helper functions to format status, priority, and category
function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'open': 'Open',
    'in_progress': 'In Progress',
    'resolved': 'Resolved',
    'closed': 'Closed'
  };
  return statusMap[status] || status;
}

function formatPriority(priority: string): string {
  const priorityMap: Record<string, string> = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High',
    'urgent': 'Urgent'
  };
  return priorityMap[priority] || priority;
}

function formatCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'battery': 'Battery Issues',
    'charging': 'Charging Problems',
    'electric_motor': 'Electric Motor',
    'controller': 'Controller Issues',
    'mechanical': 'Mechanical Problems',
    'software': 'Software/Firmware',
    'other': 'Other'
  };
  return categoryMap[category] || category;
}
