
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

// Main analytics report generator
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

  // Standardized margins
  const margin = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15
  };

  // Add header with company info
  doc.setFontSize(20);
  doc.setTextColor(0, 128, 0); // Green color for company name
  doc.text(companyInfo.name, pageWidth / 2, margin.top, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  // Split address into multiple lines
  const addressLines = doc.splitTextToSize(companyInfo.address, pageWidth - (margin.left + margin.right) - 10);
  let yPos = margin.top + 7;
  addressLines.forEach((line: string) => {
    doc.text(line, pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
  });
  
  doc.text(`Tel: ${companyInfo.phone} | Email: ${companyInfo.email}`, pageWidth / 2, yPos + 2, { align: 'center' });
  doc.text(companyInfo.website, pageWidth / 2, yPos + 7, { align: 'center' });

  // Draw a horizontal line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(0.5);
  doc.line(margin.left, yPos + 12, pageWidth - margin.right, yPos + 12);

  // Document title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text('BATTERY ANALYTICS REPORT', pageWidth / 2, yPos + 20, { align: 'center' });
  
  // Report date and user info
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated on: ${today}`, pageWidth - margin.right, yPos + 27, { align: 'right' });
  doc.text(`For: ${userName}`, margin.left + 5, yPos + 27);
  doc.text(`Period: ${analyticsData.periodStart} to ${analyticsData.periodEnd}`, margin.left + 5, yPos + 32);

  // Vehicle information in a box
  doc.setFillColor(245, 245, 245);
  doc.rect(margin.left, yPos + 37, pageWidth - (margin.left + margin.right), 30, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Vehicle Information', margin.left + 5, yPos + 44);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Model: ${vehicleData.model}`, margin.left + 10, yPos + 51);
  doc.text(`Battery Type: ${vehicleData.batteryType}`, margin.left + 10, yPos + 57);
  doc.text(`Range: ${vehicleData.range}`, margin.left + 10, yPos + 63);
  
  doc.text(`Power: ${vehicleData.power}`, pageWidth - margin.right - 75, yPos + 51);
  doc.text(`Capacity: ${vehicleData.capacity}`, pageWidth - margin.right - 75, yPos + 57);
  if (vehicleData.registrationNumber) {
    doc.text(`Reg Number: ${vehicleData.registrationNumber}`, pageWidth - margin.right - 75, yPos + 63);
  }
  
  // Battery health trend
  doc.setFillColor(240, 250, 240);
  doc.rect(margin.left, yPos + 72, pageWidth - (margin.left + margin.right), 35, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Battery Health Trend', margin.left + 5, yPos + 79);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Starting Health: ${analyticsData.batteryHealthStart}%`, margin.left + 10, yPos + 86);
  doc.text(`Current Health: ${analyticsData.batteryHealthEnd}%`, margin.left + 10, yPos + 92);
  doc.text(`Health Change: ${analyticsData.batteryHealthStart - analyticsData.batteryHealthEnd}% degradation`, margin.left + 10, yPos + 98);
  
  // Draw health bar for starting health
  doc.setFillColor(220, 220, 220);
  doc.rect(margin.left + 95, yPos + 85, 70, 4, 'F');
  doc.setFillColor(0, 180, 0); // Green
  doc.rect(margin.left + 95, yPos + 85, (analyticsData.batteryHealthStart / 100) * 70, 4, 'F');
  
  // Draw health bar for current health
  doc.setFillColor(220, 220, 220);
  doc.rect(margin.left + 95, yPos + 91, 70, 4, 'F');
  doc.setFillColor(0, 150, 0); // Slightly darker green
  doc.rect(margin.left + 95, yPos + 91, (analyticsData.batteryHealthEnd / 100) * 70, 4, 'F');
  
  // Performance metrics table
  doc.setFontSize(12);
  doc.setTextColor(0, 80, 120);
  doc.text('Performance Metrics', margin.left + 5, yPos + 115);
  
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
    tableWidth: pageWidth - (margin.left + margin.right) - 30,
    margin: { left: margin.left + 15 }
  });
  
  // Efficiency trend table
  let yPosAfterTable = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Monthly Efficiency Trend', margin.left + 5, yPosAfterTable);
  
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
    tableWidth: pageWidth - (margin.left + margin.right) - 30,
    margin: { left: margin.left + 15 }
  });
  
  // Recommendations section
  yPosAfterTable = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Recommendations Based on Analytics', margin.left + 5, yPosAfterTable);
  
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
    doc.text(`${index + 1}. ${rec}`, margin.left + 10, recommendationY);
    recommendationY += 6;
  });
  
  // Environmental impact section
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Environmental Impact', margin.left + 5, recommendationY + 10);
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  const carbonSavedText = `Your EV has saved ${analyticsData.carbonSaved} kg of CO₂ emissions compared to a conventional vehicle.`;
  const carbonSavedLines = doc.splitTextToSize(carbonSavedText, pageWidth - (margin.left + margin.right) - 20);
  doc.text(carbonSavedLines, margin.left + 10, recommendationY + 20);
  
  const treesEquivalent = Math.round(analyticsData.carbonSaved / 20); // Rough estimate: 20kg CO2 per tree per year
  const treesText = `This is equivalent to the annual carbon absorption of approximately ${treesEquivalent} trees.`;
  const treesLines = doc.splitTextToSize(treesText, pageWidth - (margin.left + margin.right) - 20);
  doc.text(treesLines, margin.left + 10, recommendationY + 30);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This report is generated by ReVithalize Battery Management System.', pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('For more information, visit our website: ' + companyInfo.website, pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Return as blob
  return doc.output('blob');
};

// Specialized PDF generators for each metric
export const generatePowerEfficiencyPDF = (userName: string, vehicleData: any): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15
  };
  
  // Add header
  doc.setFontSize(18);
  doc.setTextColor(0, 128, 0);
  doc.text('Power Efficiency Report', pageWidth / 2, margin.top, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated for: ${userName}`, pageWidth / 2, margin.top + 10, { align: 'center' });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, margin.top + 15, { align: 'center' });
  
  // Draw a line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(0.5);
  doc.line(margin.left, margin.top + 20, pageWidth - margin.right, margin.top + 20);
  
  // Vehicle information
  let yPos = margin.top + 30;
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Vehicle Information', margin.left, yPos);
  
  doc.setFontSize(10);
  doc.text(`Model: ${vehicleData.model}`, margin.left + 5, yPos + 10);
  doc.text(`Battery Type: ${vehicleData.batteryType}`, margin.left + 5, yPos + 17);
  doc.text(`Power: ${vehicleData.power}`, margin.left + 5, yPos + 24);
  
  // Efficiency metrics
  yPos += 40;
  doc.setFontSize(14);
  doc.setTextColor(0, 100, 0);
  doc.text('Power Efficiency Metrics', margin.left, yPos);
  
  // Efficiency data
  const efficiencyData = [
    { metric: 'Current Efficiency', value: '91%', notes: 'Above average for your vehicle model' },
    { metric: 'Peak Power', value: '2.2 kW', notes: 'Maximum power observed during acceleration' },
    { metric: 'Energy Consumption', value: '8.2 kWh/100km', notes: '12% better than average for this model' },
    { metric: 'Range per Charge', value: '110 km', notes: 'Based on current riding patterns' },
    { metric: 'Efficiency Trend', value: '-3%', notes: 'Slight decrease over the last 6 months' },
  ];
  
  yPos += 10;
  autoTable(doc, {
    startY: yPos,
    head: [['Metric', 'Value', 'Notes']],
    body: efficiencyData.map(item => [item.metric, item.value, item.notes]),
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 250, 240] },
  });
  
  // Recommendations
  yPos = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Recommendations to Improve Efficiency', margin.left, yPos);
  
  const recommendations = [
    'Maintain optimal tire pressure (2.5 bar) for reduced rolling resistance.',
    'Avoid rapid acceleration and hard braking to conserve energy.',
    'Use regenerative braking when possible to recover energy.',
    'Plan routes to avoid steep inclines when battery level is low.',
    'Service the motor and controller system every 5,000 km for optimal performance.',
  ];
  
  yPos += 10;
  recommendations.forEach((rec, i) => {
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(`${i + 1}. ${rec}`, margin.left + 5, yPos + (i * 7));
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This report is generated by ReVithalize Battery Management System.', pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('For more information, visit our website: ' + companyInfo.website, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  return doc.output('blob');
};

export const generateChargingCyclesPDF = (userName: string, vehicleData: any): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15
  };
  
  // Add header
  doc.setFontSize(18);
  doc.setTextColor(0, 128, 0);
  doc.text('Charging Cycles Report', pageWidth / 2, margin.top, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated for: ${userName}`, pageWidth / 2, margin.top + 10, { align: 'center' });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, margin.top + 15, { align: 'center' });
  
  // Draw a line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(0.5);
  doc.line(margin.left, margin.top + 20, pageWidth - margin.right, margin.top + 20);
  
  // Vehicle information
  let yPos = margin.top + 30;
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Vehicle Information', margin.left, yPos);
  
  doc.setFontSize(10);
  doc.text(`Model: ${vehicleData.model}`, margin.left + 5, yPos + 10);
  doc.text(`Battery Type: ${vehicleData.batteryType}`, margin.left + 5, yPos + 17);
  doc.text(`Battery Capacity: ${vehicleData.capacity}`, margin.left + 5, yPos + 24);
  
  // Charging metrics
  yPos += 40;
  doc.setFontSize(14);
  doc.setTextColor(0, 100, 0);
  doc.text('Charging Cycles Analysis', margin.left, yPos);
  
  // Draw cycle usage bar
  yPos += 15;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text('Current Cycle Usage: 124 of 1,500 (8.3%)', margin.left, yPos);
  
  yPos += 10;
  doc.setFillColor(220, 220, 220);
  doc.roundedRect(margin.left, yPos, pageWidth - (margin.left + margin.right), 10, 2, 2, 'F');
  doc.setFillColor(0, 180, 0);
  doc.roundedRect(margin.left, yPos, (pageWidth - (margin.left + margin.right)) * 0.083, 10, 2, 2, 'F');
  
  // Charging data
  yPos += 20;
  const chargingData = [
    { metric: 'Total Cycles Used', value: '124', notes: '8.3% of total rated cycles' },
    { metric: 'Avg. Cycles per Month', value: '12', notes: 'Expected battery lifespan: 10+ years' },
    { metric: 'Last Full Charge', value: 'Today, 8:30 AM', notes: '100% charge reached' },
    { metric: 'Avg. Charge Time', value: '3h 20m', notes: 'Using standard charger (850W)' },
    { metric: 'Partial Charges', value: '68', notes: 'Number of partial charges (20-80%)' },
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [['Metric', 'Value', 'Notes']],
    body: chargingData.map(item => [item.metric, item.value, item.notes]),
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 250, 240] },
  });
  
  // Recommendations
  yPos = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Optimal Charging Practices', margin.left, yPos);
  
  const recommendations = [
    'For daily use, maintain battery level between 20-80% to maximize battery longevity.',
    'Full charges (100%) are recommended only before long trips.',
    'Avoid letting battery discharge below 10% when possible.',
    'Charge at moderate temperatures (15-30°C) for optimal cell performance.',
    'Consider using scheduled charging to benefit from off-peak electricity rates.',
  ];
  
  yPos += 10;
  recommendations.forEach((rec, i) => {
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(`${i + 1}. ${rec}`, margin.left + 5, yPos + (i * 7));
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This report is generated by ReVithalize Battery Management System.', pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('For more information, visit our website: ' + companyInfo.website, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  return doc.output('blob');
};

export const generateEnvironmentalImpactPDF = (userName: string, vehicleData: any): Blob => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = {
    left: 15,
    right: 15,
    top: 15,
    bottom: 15
  };
  
  // Add header
  doc.setFontSize(18);
  doc.setTextColor(0, 128, 0);
  doc.text('Environmental Impact Report', pageWidth / 2, margin.top, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(`Generated for: ${userName}`, pageWidth / 2, margin.top + 10, { align: 'center' });
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, margin.top + 15, { align: 'center' });
  
  // Draw a line
  doc.setDrawColor(0, 128, 0);
  doc.setLineWidth(0.5);
  doc.line(margin.left, margin.top + 20, pageWidth - margin.right, margin.top + 20);
  
  // Vehicle information
  let yPos = margin.top + 30;
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Vehicle Information', margin.left, yPos);
  
  doc.setFontSize(10);
  doc.text(`Model: ${vehicleData.model}`, margin.left + 5, yPos + 10);
  doc.text(`Distance Travelled: 1,275 km`, margin.left + 5, yPos + 17);
  doc.text(`Energy Source: 82% Renewable`, margin.left + 5, yPos + 24);
  
  // Impact metrics
  yPos += 40;
  doc.setFontSize(14);
  doc.setTextColor(0, 100, 0);
  doc.text('Environmental Impact Analysis', margin.left, yPos);
  
  // CO2 savings highlight
  yPos += 15;
  doc.setFillColor(240, 255, 240);
  doc.roundedRect(margin.left, yPos, pageWidth - (margin.left + margin.right), 30, 3, 3, 'F');
  
  doc.setFontSize(12);
  doc.setTextColor(0, 120, 0);
  doc.text('CO₂ Emissions Saved', pageWidth / 2, yPos + 10, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(0, 150, 0);
  doc.text('120 kg', pageWidth / 2, yPos + 22, { align: 'center' });
  
  // Environmental data
  yPos += 40;
  const environmentalData = [
    { metric: 'CO₂ Emissions Saved', value: '120 kg', notes: 'Compared to equivalent petrol vehicle' },
    { metric: 'Trees Equivalent', value: '6 trees', notes: 'Annual carbon absorption' },
    { metric: 'Petrol Saved', value: '52 liters', notes: 'Based on average consumption of 4.1L/100km' },
    { metric: 'Local Air Pollution Reduction', value: '98%', notes: 'No NOx, SOx, or particulate emissions' },
    { metric: 'Carbon Footprint Reduction', value: '73%', notes: 'Including manufacturing and charging impacts' },
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [['Metric', 'Value', 'Notes']],
    body: environmentalData.map(item => [item.metric, item.value, item.notes]),
    theme: 'grid',
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: [0, 100, 0], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 250, 240] },
  });
  
  // Energy source breakdown
  yPos = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(12);
  doc.setTextColor(0, 100, 0);
  doc.text('Energy Source Breakdown', margin.left, yPos);
  
  yPos += 10;
  const energySources = [
    { source: 'Solar', percentage: 42 },
    { source: 'Wind', percentage: 23 },
    { source: 'Hydro', percentage: 17 },
    { source: 'Natural Gas', percentage: 11 },
    { source: 'Coal', percentage: 7 },
  ];
  
  // Draw energy source bars
  energySources.forEach((source, i) => {
    const barY = yPos + (i * 15);
    
    // Source name and percentage
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.text(`${source.source}:`, margin.left, barY + 4);
    doc.text(`${source.percentage}%`, margin.left + 140, barY + 4);
    
    // Bar background
    doc.setFillColor(220, 220, 220);
    doc.roundedRect(margin.left + 30, barY, 100, 8, 1, 1, 'F');
    
    // Bar fill - different color for each source
    const colors = [
      [255, 204, 0],    // Solar - yellow
      [0, 153, 204],    // Wind - blue
      [51, 153, 255],   // Hydro - light blue
      [153, 204, 255],  // Natural Gas - pale blue
      [102, 102, 102],  // Coal - grey
    ];
    
    doc.setFillColor(colors[i][0], colors[i][1], colors[i][2]);
    doc.roundedRect(margin.left + 30, barY, source.percentage, 8, 1, 1, 'F');
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This report is generated by ReVithalize Battery Management System.', pageWidth / 2, pageHeight - 15, { align: 'center' });
  doc.text('For more information, visit our website: ' + companyInfo.website, pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  return doc.output('blob');
};

export const generateExportDataPDF = (dataType: string, userName: string, vehicleData: any): Blob => {
  // Choose appropriate generator based on data type
  switch (dataType) {
    case 'power':
      return generatePowerEfficiencyPDF(userName, vehicleData);
    case 'charging':
      return generateChargingCyclesPDF(userName, vehicleData);
    case 'environmental':
      return generateEnvironmentalImpactPDF(userName, vehicleData);
    default:
      // Fall back to analytics report
      const analyticsData = {
        periodStart: '2024-01-01',
        periodEnd: '2024-05-05',
        batteryHealthStart: 100,
        batteryHealthEnd: 97,
        efficiencyTrend: [
          { month: 'Jan', value: 95 },
          { month: 'Feb', value: 94 },
          { month: 'Mar', value: 93 },
          { month: 'Apr', value: 92 },
          { month: 'May', value: 91 },
        ],
        tempTrend: [
          { month: 'Jan', value: 27 },
          { month: 'Feb', value: 28 },
          { month: 'Mar', value: 30 },
          { month: 'Apr', value: 32 },
          { month: 'May', value: 35 },
        ],
        chargeCycles: 124,
        topSpeed: 55,
        avgSpeed: 32,
        rangeTrend: [
          { month: 'Jan', value: 155 },
          { month: 'Feb', value: 152 },
          { month: 'Mar', value: 148 },
          { month: 'Apr', value: 145 },
          { month: 'May', value: 141 },
        ],
        powerConsumption: 8.2,
        carbonSaved: 120,
      };
      return generateAnalyticsReportPDF(analyticsData, userName, vehicleData);
  }
};
