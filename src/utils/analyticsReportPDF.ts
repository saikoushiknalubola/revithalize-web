
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

interface AnalyticsData {
  periodStart: string;
  periodEnd: string;
  batteryHealthStart: number;
  batteryHealthEnd: number;
  efficiencyTrend: { month: string; value: number }[];
  tempTrend: { month: string; value: number }[];
  chargeCycles: number;
  topSpeed: number;
  avgSpeed: number;
  rangeTrend: { month: string; value: number }[];
  powerConsumption: number;
  carbonSaved: number;
}

export const generateAnalyticsReportPDF = (
  analyticsData: AnalyticsData,
  userName: string,
  vehicleData: any
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
  doc.text('BATTERY ANALYTICS REPORT', pageWidth / 2, yPos + 20, { align: 'center' });
  
  // Report date and user info
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated on: ${today}`, pageWidth - 20, yPos + 27, { align: 'right' });
  doc.text(`For: ${userName}`, 20, yPos + 27);
  doc.text(`Period: ${analyticsData.periodStart} to ${analyticsData.periodEnd}`, 20, yPos + 32);

  // Vehicle information in a box
  doc.setFillColor(245, 245, 245);
  doc.rect(15, yPos + 37, pageWidth - 30, 30, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Vehicle Information', 20, yPos + 44);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Model: ${vehicleData.model}`, 25, yPos + 51);
  doc.text(`Battery Type: ${vehicleData.batteryType}`, 25, yPos + 57);
  doc.text(`Range: ${vehicleData.range}`, 25, yPos + 63);
  
  doc.text(`Power: ${vehicleData.power}`, pageWidth - 90, yPos + 51);
  doc.text(`Capacity: ${vehicleData.capacity}`, pageWidth - 90, yPos + 57);
  if (vehicleData.registrationNumber) {
    doc.text(`Reg Number: ${vehicleData.registrationNumber}`, pageWidth - 90, yPos + 63);
  }
  
  // Battery health trend
  doc.setFillColor(240, 250, 240);
  doc.rect(15, yPos + 72, pageWidth - 30, 35, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Battery Health Trend', 20, yPos + 79);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Starting Health: ${analyticsData.batteryHealthStart}%`, 25, yPos + 86);
  doc.text(`Current Health: ${analyticsData.batteryHealthEnd}%`, 25, yPos + 92);
  doc.text(`Health Change: ${analyticsData.batteryHealthStart - analyticsData.batteryHealthEnd}% degradation`, 25, yPos + 98);
  
  // Draw health bar for starting health
  doc.setFillColor(220, 220, 220);
  doc.rect(110, yPos + 85, 70, 4, 'F');
  doc.setFillColor(0, 180, 0); // Green
  doc.rect(110, yPos + 85, (analyticsData.batteryHealthStart / 100) * 70, 4, 'F');
  
  // Draw health bar for current health
  doc.setFillColor(220, 220, 220);
  doc.rect(110, yPos + 91, 70, 4, 'F');
  doc.setFillColor(0, 150, 0); // Slightly darker green
  doc.rect(110, yPos + 91, (analyticsData.batteryHealthEnd / 100) * 70, 4, 'F');
  
  // Performance metrics table
  doc.setFontSize(12);
  doc.setTextColor(0, 80, 120);
  doc.text('Performance Metrics', 20, yPos + 115);
  
  // Performance data table
  autoTable(doc, {
    startY: yPos + 118,
    head: [['Metric', 'Value', 'Unit']],
    body: [
      ['Power Consumption', analyticsData.powerConsumption.toString(), 'kWh/100km'],
      ['Charge Cycles', analyticsData.chargeCycles.toString(), 'cycles'],
      ['Top Speed', analyticsData.topSpeed.toString(), 'km/h'],
      ['Average Speed', analyticsData.avgSpeed.toString(), 'km/h'],
      ['Carbon Saved', analyticsData.carbonSaved.toString(), 'kg CO₂'],
    ],
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [0, 100, 120], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 245, 250] },
    tableWidth: pageWidth - 60,
    margin: { left: 30 }
  });
  
  // Efficiency trend table
  let yPosAfterTable = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Monthly Efficiency Trend', 20, yPosAfterTable);
  
  // Monthly efficiency data
  const efficiencyTableData = analyticsData.efficiencyTrend.map(item => [
    item.month, 
    `${item.value}%`, 
    `${analyticsData.tempTrend.find(t => t.month === item.month)?.value || 'N/A'}°C`,
    `${analyticsData.rangeTrend.find(r => r.month === item.month)?.value || 'N/A'} km`
  ]);
  
  autoTable(doc, {
    startY: yPosAfterTable + 5,
    head: [['Month', 'Efficiency', 'Avg Temp', 'Range']],
    body: efficiencyTableData,
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 250, 240] },
    tableWidth: pageWidth - 60,
    margin: { left: 30 }
  });
  
  // Recommendations section
  yPosAfterTable = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Recommendations Based on Analytics', 20, yPosAfterTable);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  const recommendations = [
    'Optimize charging schedule to improve battery health retention.',
    'Consider battery balancing service to maintain optimal performance.',
    'Monitor temperature during summer months to prevent accelerated degradation.',
    'Schedule a diagnostic check before long trips to ensure peak efficiency.',
    'Maintain consistent riding patterns to optimize range predictions.'
  ];
  
  let recommendationY = yPosAfterTable + 10;
  recommendations.forEach((rec, index) => {
    doc.text(`${index + 1}. ${rec}`, 25, recommendationY);
    recommendationY += 6;
  });
  
  // Environmental impact section
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Environmental Impact', 20, recommendationY + 10);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  const carbonSavedText = `Your EV has saved ${analyticsData.carbonSaved} kg of CO₂ emissions compared to a conventional vehicle.`;
  const carbonSavedLines = doc.splitTextToSize(carbonSavedText, pageWidth - 50);
  doc.text(carbonSavedLines, 25, recommendationY + 20);
  
  const treesEquivalent = Math.round(analyticsData.carbonSaved / 20); // Rough estimate: 20kg CO2 per tree per year
  const treesText = `This is equivalent to the annual carbon absorption of approximately ${treesEquivalent} trees.`;
  const treesLines = doc.splitTextToSize(treesText, pageWidth - 50);
  doc.text(treesLines, 25, recommendationY + 30);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This report is generated by ReVithalize Battery Management System.', pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('For more information, visit our website: ' + companyInfo.website, pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Return as blob
  return doc.output('blob');
};
