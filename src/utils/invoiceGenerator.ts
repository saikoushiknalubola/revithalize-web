
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customer: string;
  email: string;
  plan: string;
  amount: string;
  nextBilling: string;
  billingPeriod: string;
}

export const generateInvoicePDF = (invoiceData: InvoiceData): Blob => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Professional Header with Company Branding
    doc.setFillColor(0, 255, 148);
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // Company Logo Area (placeholder for future logo)
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, 10, 30, 30, 3, 3, 'F');
    
    // Company Name
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize', 50, 25);
    
    // Company Tagline
    doc.setFontSize(14);
    doc.setTextColor(20, 20, 20);
    doc.setFont('helvetica', 'normal');
    doc.text('Revolutionizing Electric Vehicle Management', 50, 32);
    
    // Company Details
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.text('www.revithalize.com | support@revithalize.com | +91 7671030069', 50, 40);
    
    // Invoice Title
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageWidth / 2, 70, { align: 'center' });
    
    // Professional Invoice Details Box
    doc.setDrawColor(0, 255, 148);
    doc.setLineWidth(1);
    doc.rect(15, 80, pageWidth - 30, 30);
    doc.setFillColor(248, 250, 252);
    doc.rect(15, 80, pageWidth - 30, 30, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, 90);
    doc.text(`Issue Date: ${invoiceData.date}`, 20, 98);
    doc.text(`Due Date: ${invoiceData.nextBilling}`, pageWidth - 90, 90);
    doc.text(`Status: PAID`, pageWidth - 90, 98);
    
    // Customer Information Section
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 130);
    
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(invoiceData.customer, 20, 142);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.email, 20, 152);
    doc.text('Premium EV Management Subscriber', 20, 162);
    
    // Company Information Section
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('From:', pageWidth - 100, 130);
    
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize Mobility Pvt. Ltd.', pageWidth - 20, 142, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.text('Bangalore, Karnataka 560001', pageWidth - 20, 152, { align: 'right' });
    doc.text('India', pageWidth - 20, 162, { align: 'right' });
    doc.text('GSTIN: 29AABCR1234M1ZX', pageWidth - 20, 172, { align: 'right' });
    
    // Professional Services Table
    autoTable(doc, {
      startY: 185,
      head: [['Service Description', 'Billing Period', 'Qty', 'Rate (₹)', 'Amount (₹)']],
      body: [
        [
          'EV Management Premium Subscription\n• Real-time battery monitoring & analytics\n• Advanced predictive maintenance AI\n• Comprehensive fleet management tools\n• Priority customer support & consultation',
          invoiceData.billingPeriod,
          '1',
          invoiceData.amount,
          invoiceData.amount
        ],
      ],
      theme: 'grid',
      styles: { 
        fontSize: 10, 
        cellPadding: 8,
        textColor: [60, 60, 60],
        lineColor: [200, 200, 200],
        lineWidth: 0.5
      },
      headStyles: { 
        fillColor: [0, 255, 148], 
        textColor: [0, 0, 0],
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 85, valign: 'top' },
        1: { cellWidth: 35, halign: 'center' },
        2: { cellWidth: 15, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
      },
      alternateRowStyles: {
        fillColor: [252, 252, 252]
      }
    });
    
    // Enhanced Financial Summary
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    const baseAmount = parseFloat(invoiceData.amount.replace('₹', ''));
    const gstAmount = baseAmount * 0.18;
    const totalAmount = baseAmount + gstAmount;
    
    // Summary Box
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.rect(pageWidth - 80, finalY, 65, 40);
    doc.setFillColor(250, 250, 250);
    doc.rect(pageWidth - 80, finalY, 65, 40, 'F');
    
    // Financial Details
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal:', pageWidth - 75, finalY + 10);
    doc.text(`₹${baseAmount.toFixed(2)}`, pageWidth - 20, finalY + 10, { align: 'right' });
    
    doc.text('GST (18%):', pageWidth - 75, finalY + 20);
    doc.text(`₹${gstAmount.toFixed(2)}`, pageWidth - 20, finalY + 20, { align: 'right' });
    
    // Total Amount Line
    doc.setLineWidth(1);
    doc.setDrawColor(0, 255, 148);
    doc.line(pageWidth - 75, finalY + 25, pageWidth - 20, finalY + 25);
    
    doc.setFontSize(13);
    doc.setTextColor(0, 100, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', pageWidth - 75, finalY + 35);
    doc.text(`₹${totalAmount.toFixed(2)}`, pageWidth - 20, finalY + 35, { align: 'right' });
    
    // Payment Information Section
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('Payment Information:', 20, finalY + 55);
    doc.setFont('helvetica', 'bold');
    doc.text(`• Payment Method: UPI/Card Payment`, 20, finalY + 65);
    doc.text(`• Transaction ID: RVT${Date.now().toString().slice(-10)}`, 20, finalY + 75);
    doc.text(`• Next Billing Date: ${invoiceData.nextBilling}`, 20, finalY + 85);
    doc.text(`• Auto-renewal: Enabled`, 20, finalY + 95);
    
    // Professional Terms and Conditions
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions:', 20, finalY + 110);
    doc.setFont('helvetica', 'normal');
    const terms = [
      '• This invoice is electronically generated and does not require a physical signature.',
      '• Subscription auto-renews unless cancelled 24 hours before the next billing date.',
      '• For technical support or billing queries, contact us at support@revithalize.com',
      '• Refunds are processed as per our refund policy available at www.revithalize.com/refunds',
      '• All charges are in Indian Rupees (₹) and inclusive of applicable taxes.'
    ];
    
    terms.forEach((term, index) => {
      doc.text(term, 20, finalY + 120 + (index * 8));
    });
    
    // Professional Footer
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 275, pageWidth, 20, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'bold');
    doc.text('Thank you for choosing Revithalize for your EV management solutions!', pageWidth / 2, 282, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.text('This invoice was generated on ' + new Date().toLocaleString('en-IN'), pageWidth / 2, 290, { align: 'center' });
    
    return doc.output('blob');
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    
    // Enhanced Fallback PDF
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(0, 255, 148);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize Invoice', 20, 30);
    
    doc.setFontSize(14);
    doc.setTextColor(220, 38, 127);
    doc.text('Invoice Generation Error', 20, 50);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('We apologize for the inconvenience. Unable to generate your invoice at this time.', 20, 70);
    doc.text('Please contact our support team at support@revithalize.com for immediate assistance.', 20, 85);
    doc.text(`Reference ID: RVT-ERR-${Date.now()}`, 20, 105);
    doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 20, 120);
    
    return doc.output('blob');
  }
};
