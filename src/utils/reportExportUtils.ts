
import { generateBatteryReportPDF, generateComplianceReportPDF, generateAdvancedAnalyticsReportPDF } from './pdfGenerator';
import { toast } from 'sonner';

interface ExportOptions {
  reportType: 'battery' | 'compliance' | 'analytics' | 'custom';
  format: 'pdf' | 'csv' | 'json' | 'excel';
  data?: any;
  userName?: string;
}

export const exportReport = async (options: ExportOptions): Promise<void> => {
  try {
    const { reportType, format, data, userName = 'Customer' } = options;
    
    if (format === 'pdf') {
      let pdfBlob: Blob;
      
      switch (reportType) {
        case 'battery':
          const batteryData = data?.batteryData || {
            currentHealth: 97,
            projectedHealth: 90,
            cellBalance: 95,
            chargingCycles: 124,
            capacityRetention: 97,
            range: 110,
            efficiency: 91,
            averageTemp: 32,
            lastCharge: 'Today, 08:30 AM',
            nextService: 'In 3 months',
          };
          
          const vehicleData = data?.vehicleData || {
            model: 'Hero Honda Passion AP02SK2409',
            batteryType: '51.2V 45Ah Lithium-Ion',
            range: 'Up to 110 km',
            power: '2.2 kW',
            capacity: '45 Ah',
            registrationNumber: 'AP02SK2409',
          };
          
          const usageData = data?.usageData || {
            weeklyDistance: 83,
            monthlyDistance: 321,
            totalDistance: 1275,
            avgEfficiency: 91,
            avgTemp: 32,
          };
          
          pdfBlob = generateBatteryReportPDF(batteryData, vehicleData, usageData, userName);
          break;
          
        case 'compliance':
          const complianceData = data || {
            items: [
              { category: 'Safety', status: 'Compliant', lastChecked: '2 days ago', nextDue: '3 months' },
              { category: 'Environmental', status: 'Compliant', lastChecked: '1 week ago', nextDue: '6 months' },
              { category: 'Legal', status: 'Warning', lastChecked: '1 month ago', nextDue: '2 weeks' }
            ]
          };
          pdfBlob = generateComplianceReportPDF(complianceData, userName);
          break;
          
        case 'analytics':
        default:
          const analyticsData = data || {
            efficiency: 91,
            batteryHealth: 97,
            rangeOpt: 87,
            costSavings: 12450
          };
          pdfBlob = generateAdvancedAnalyticsReportPDF(analyticsData, userName);
          break;
      }
      
      // Download PDF
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } else if (format === 'csv') {
      // Generate CSV based on report type
      let csvContent = '';
      
      switch (reportType) {
        case 'battery':
          csvContent = `Date,Health,Efficiency,Temperature,Range,Cycles
2024-01-01,99,95,27,155,10
2024-02-01,98,94,28,152,25
2024-03-01,98,93,30,148,42
2024-04-01,97,92,32,145,58
2024-05-01,97,91,35,141,75`;
          break;
        case 'compliance':
          csvContent = `Category,Status,Last_Checked,Next_Due
Safety,Compliant,2024-05-03,2024-08-03
Environmental,Compliant,2024-04-28,2024-10-28
Legal,Warning,2024-04-05,2024-05-19
Quality,Compliant,2024-04-30,2024-05-30`;
          break;
        default:
          csvContent = `Metric,Value,Unit,Date
Efficiency,91,%,2024-05-05
Battery_Health,97,%,2024-05-05
Range_Optimization,87,%,2024-05-05
Cost_Savings,12450,INR,2024-05-05`;
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${reportType}-data-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } else if (format === 'json') {
      // Generate JSON based on report type
      let jsonData: any = {};
      
      switch (reportType) {
        case 'battery':
          jsonData = {
            reportType: 'battery',
            generatedAt: new Date().toISOString(),
            user: userName,
            data: data || {
              health: { current: 97, projected: 90 },
              efficiency: 91,
              cycles: 124,
              temperature: 32,
              range: 110
            }
          };
          break;
        case 'compliance':
          jsonData = {
            reportType: 'compliance',
            generatedAt: new Date().toISOString(),
            user: userName,
            data: data || {
              overallScore: 85,
              items: [
                { category: 'Safety', status: 'Compliant', score: 95 },
                { category: 'Environmental', status: 'Compliant', score: 90 },
                { category: 'Legal', status: 'Warning', score: 70 }
              ]
            }
          };
          break;
        default:
          jsonData = {
            reportType: 'analytics',
            generatedAt: new Date().toISOString(),
            user: userName,
            data: data || {
              performance: { efficiency: 91, health: 97 },
              usage: { monthly: 321, total: 1275 },
              environmental: { carbonSaved: 120 }
            }
          };
      }
      
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${reportType}-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast.success(`${reportType} report exported successfully as ${format.toUpperCase()}`);
    
  } catch (error) {
    console.error('Export error:', error);
    toast.error('Failed to export report. Please try again.');
  }
};

export const scheduleReport = (reportType: string, frequency: string, email?: string): void => {
  // Mock implementation for scheduling reports
  console.log(`Scheduling ${reportType} report with frequency: ${frequency}`);
  
  if (email) {
    toast.success(`${reportType} report scheduled to be sent to ${email} ${frequency}`);
  } else {
    toast.success(`${reportType} report scheduled to be generated ${frequency}`);
  }
};

export const emailReport = (reportType: string, recipients: string[]): void => {
  // Mock implementation for emailing reports
  console.log(`Emailing ${reportType} report to:`, recipients);
  toast.success(`${reportType} report sent to ${recipients.length} recipient(s)`);
};
