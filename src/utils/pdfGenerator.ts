
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
  name: 'Revithalize Mobility',
  address: 'ReVithalize Innovations, Corporate Headquarters, plt no 54/5-6 Nakkalagutta, Hanamakonda, Telangana 506001, Bharat (India)',
  phone: '+91 7671030069',
  email: 'support@revithalize.com',
  website: 'revithalize.oddo.com',
};

// Battery report interfaces
interface BatteryData {
  currentHealth: number;
  projectedHealth: number;
  cellBalance: number;
  chargingCycles: number;
  capacityRetention: number;
  range: number;
  efficiency: number;
  averageTemp: number;
  lastCharge: string;
  nextService: string;
}

interface VehicleData {
  model: string;
  batteryType: string;
  range: string;
  power: string;
  capacity: string;
  registrationNumber?: string;
}

interface UsageData {
  weeklyDistance: number;
  monthlyDistance: number;
  totalDistance: number;
  avgEfficiency: number;
  avgTemp: number;
}

export const generateBatteryReportPDF = (
  batteryData: BatteryData, 
  vehicleData: VehicleData, 
  usageData: UsageData,
  userName: string
): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  // Add header with company info
  doc.setFontSize(20);
  doc.setTextColor(0, 128, 0); // Green color for company name
  doc.text(companyInfo.name, pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  // Split address into multiple lines
  const addressLines = doc.splitTextToSize(companyInfo.address, pageWidth - 40);
  let yPos = 22;
  addressLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
  });
  
  doc.text(`Tel: ${companyInfo.phone} | Email: ${companyInfo.email}`, pageWidth / 2, yPos + 2, { align: 'center' });
  doc.text(companyInfo.website, pageWidth / 2, yPos + 7, { align: 'center' });

  // Draw a horizontal line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(0.5);
  doc.line(15, yPos + 12, pageWidth - 15, yPos + 12);

  // Document title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text('BATTERY HEALTH REPORT', pageWidth / 2, yPos + 20, { align: 'center' });
  
  // Report date and user info
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated on: ${today}`, pageWidth - 20, yPos + 27, { align: 'right' });
  doc.text(`For: ${userName}`, 20, yPos + 27);

  // Vehicle information in a box
  doc.setFillColor(245, 245, 245);
  doc.rect(15, yPos + 32, pageWidth - 30, 30, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Vehicle Information', 20, yPos + 39);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Model: ${vehicleData.model}`, 25, yPos + 46);
  doc.text(`Battery Type: ${vehicleData.batteryType}`, 25, yPos + 52);
  doc.text(`Range: ${vehicleData.range}`, 25, yPos + 58);
  
  doc.text(`Power: ${vehicleData.power}`, pageWidth - 90, yPos + 46);
  doc.text(`Capacity: ${vehicleData.capacity}`, pageWidth - 90, yPos + 52);
  if (vehicleData.registrationNumber) {
    doc.text(`Reg Number: ${vehicleData.registrationNumber}`, pageWidth - 90, yPos + 58);
  }
  
  // Battery health summary
  doc.setFillColor(240, 250, 240);
  doc.rect(15, yPos + 67, pageWidth - 30, 40, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Battery Health Summary', 20, yPos + 74);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  // Left column
  doc.text('Current Health:', 25, yPos + 82);
  doc.text('Projected Health:', 25, yPos + 89);
  doc.text('Capacity Retention:', 25, yPos + 96);
  doc.text('Charging Cycles:', 25, yPos + 103);
  
  // Right column
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`${batteryData.currentHealth}%`, 80, yPos + 82);
  doc.text(`${batteryData.projectedHealth}%`, 80, yPos + 89);
  doc.text(`${batteryData.capacityRetention}%`, 80, yPos + 96);
  doc.text(`${batteryData.chargingCycles} of 1500`, 80, yPos + 103);
  
  // Draw battery health bars
  const drawHealthBar = (yPosition: number, value: number) => {
    doc.setFillColor(220, 220, 220);
    doc.rect(110, yPosition - 3, 70, 4, 'F');
    
    // Choose color based on value
    if (value >= 80) {
      doc.setFillColor(0, 180, 0); // Green
    } else if (value >= 60) {
      doc.setFillColor(255, 180, 0); // Orange
    } else {
      doc.setFillColor(220, 50, 50); // Red
    }
    
    doc.rect(110, yPosition - 3, (value / 100) * 70, 4, 'F');
  };
  
  drawHealthBar(yPos + 82, batteryData.currentHealth);
  drawHealthBar(yPos + 89, batteryData.projectedHealth);
  drawHealthBar(yPos + 96, batteryData.capacityRetention);
  
  // Draw charging cycles progress (different scale)
  doc.setFillColor(220, 220, 220);
  doc.rect(110, yPos + 100, 70, 4, 'F');
  const cyclePercentage = (batteryData.chargingCycles / 1500) * 100;
  doc.setFillColor(0, 120, 180); // Blue
  doc.rect(110, yPos + 100, (cyclePercentage / 100) * 70, 4, 'F');
  
  // Usage statistics
  doc.setFillColor(240, 245, 250);
  doc.rect(15, yPos + 112, pageWidth - 30, 35, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 80, 120);
  doc.text('Usage Statistics', 20, yPos + 119);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  // Usage data table
  autoTable(doc, {
    startY: yPos + 122,
    head: [['Period', 'Distance', 'Efficiency', 'Avg. Temperature']],
    body: [
      ['This Week', `${usageData.weeklyDistance} km`, `${usageData.avgEfficiency}%`, `${usageData.avgTemp}°C`],
      ['This Month', `${usageData.monthlyDistance} km`, `${usageData.avgEfficiency}%`, `${usageData.avgTemp}°C`],
      ['Total', `${usageData.totalDistance} km`, '', ''],
    ],
    theme: 'grid',
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [0, 100, 120], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 245, 250] },
    tableWidth: pageWidth - 60,
    margin: { left: 30 }
  });
  
  // Additional information
  const yPosAfterTable = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Additional Information', 20, yPosAfterTable);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  doc.text(`Last Charge: ${batteryData.lastCharge}`, 25, yPosAfterTable + 8);
  doc.text(`Next Service: ${batteryData.nextService}`, 25, yPosAfterTable + 15);
  doc.text(`Cell Balance: ${batteryData.cellBalance === 100 ? 'Optimal' : 'Needs Attention'}`, 25, yPosAfterTable + 22);
  
  // Add recommendations section
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Recommendations', 20, yPosAfterTable + 32);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  const recommendations = [
    'For optimal battery performance, avoid extreme temperatures during charging.',
    'Maintain regular service schedules to ensure maximum battery life.',
    'Monitor battery performance through the ReVithalize mobile app.',
    'For questions or concerns, contact our support team.'
  ];
  
  let recommendationY = yPosAfterTable + 38;
  recommendations.forEach((rec, index) => {
    doc.text(`${index + 1}. ${rec}`, 25, recommendationY);
    recommendationY += 6;
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This report is generated by ReVithalize Battery Management System.', pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('For more information, visit our website: ' + companyInfo.website, pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Return as blob
  return doc.output('blob');
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
  
  // Split address into multiple lines
  const addressLines = doc.splitTextToSize(companyInfo.address, pageWidth - 40);
  let yPos = 27;
  addressLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
  });
  
  doc.text(`Tel: ${companyInfo.phone} | Email: ${companyInfo.email}`, pageWidth / 2, yPos + 2, { align: 'center' });
  doc.text(companyInfo.website, pageWidth / 2, yPos + 7, { align: 'center' });

  // Draw a horizontal line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(0.5);
  doc.line(15, yPos + 12, pageWidth - 15, yPos + 12);

  // Document title
  doc.setFontSize(16);
  doc.setTextColor(40, 40, 40);
  doc.text('SERVICE TICKET', pageWidth / 2, yPos + 20, { align: 'center' });

  // Ticket details in a box
  doc.setFillColor(245, 245, 245);
  doc.rect(15, yPos + 25, pageWidth - 30, 25, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Ticket #: ${ticket.id}`, 20, yPos + 32);
  doc.text(`Date: ${today}`, pageWidth - 20, yPos + 32, { align: 'right' });
  doc.text(`Status: ${formatStatus(ticket.status)}`, 20, yPos + 39);
  doc.text(`Priority: ${formatPriority(ticket.priority)}`, pageWidth - 20, yPos + 39, { align: 'right' });
  doc.text(`Category: ${formatCategory(ticket.category)}`, 20, yPos + 46);
  
  // Customer information
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Customer Information', 15, yPos + 60);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Name: ${userName}`, 20, yPos + 70);
  doc.text(`User ID: ${ticket.userId}`, 20, yPos + 77);
  
  // Vehicle information
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Vehicle Information', 15, yPos + 90);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Vehicle: ${vehicleDetails.model || 'Hero Honda Passion'}`, 20, yPos + 100);
  doc.text(`Battery Type: ${vehicleDetails.batteryType || '51.2V 45Ah Lithium-Ion'}`, 20, yPos + 107);
  doc.text(`Range: ${vehicleDetails.range || 'Up to 110 km'}`, 20, yPos + 114);
  
  // Ticket details
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 40);
  doc.text('Ticket Details', 15, yPos + 130);
  
  // Add title and description
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Title:', 20, yPos + 140);
  doc.setFontSize(10);
  doc.text(ticket.title, 35, yPos + 140);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Description:', 20, yPos + 150);
  
  // Add multiline text support for description
  const description = doc.splitTextToSize(ticket.description, pageWidth - 40);
  doc.setFontSize(10);
  doc.text(description, 20, yPos + 160);
  
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
