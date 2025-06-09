
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
    
    // Company Logo/Header Section
    doc.setFillColor(0, 128, 0);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    // Company Name
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text('Revithalize Mobility', pageWidth / 2, 20, { align: 'center' });
    
    // Company Tagline
    doc.setFontSize(12);
    doc.setTextColor(240, 240, 240);
    doc.text('Revolutionizing Electric Vehicle Management', pageWidth / 2, 30, { align: 'center' });
    
    // Company Details
    doc.setFontSize(9);
    doc.setTextColor(220, 220, 220);
    doc.text('www.revithalize.com | support@revithalize.com | +91 7671030069', pageWidth / 2, 38, { align: 'center' });
    
    // Invoice Title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('INVOICE', pageWidth / 2, 60, { align: 'center' });
    
    // Invoice Details Box
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(15, 70, pageWidth - 30, 25);
    
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 80);
    doc.text(`Issue Date: ${invoiceData.date}`, 20, 87);
    doc.text(`Due Date: ${invoiceData.nextBilling}`, pageWidth - 80, 80);
    doc.text(`Status: PAID`, pageWidth - 80, 87);
    
    // Bill To Section
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Bill To:', 20, 110);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(invoiceData.customer, 20, 120);
    doc.text(invoiceData.email, 20, 128);
    doc.text('Premium EV Management Subscriber', 20, 136);
    
    // Company Bill From Section
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('From:', pageWidth - 80, 110);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text('Revithalize Mobility Pvt. Ltd.', pageWidth - 80, 120, { align: 'right' });
    doc.text('Bangalore, Karnataka, India', pageWidth - 80, 128, { align: 'right' });
    doc.text('GSTIN: 29XXXXX1234X1ZX', pageWidth - 80, 136, { align: 'right' });
    
    // Services Table
    autoTable(doc, {
      startY: 150,
      head: [['Service Description', 'Billing Period', 'Quantity', 'Rate', 'Amount']],
      body: [
        [
          'EV Management Premium Subscription\n• Real-time battery monitoring\n• Advanced analytics dashboard\n• Predictive maintenance AI\n• Priority customer support',
          invoiceData.billingPeriod,
          '1',
          invoiceData.amount,
          invoiceData.amount
        ],
      ],
      theme: 'grid',
      styles: { 
        fontSize: 9, 
        cellPadding: 6,
        textColor: [60, 60, 60]
      },
      headStyles: { 
        fillColor: [0, 128, 0], 
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'right' }
      },
      didParseCell: function(data) {
        if (data.section === 'body' && data.column.index === 0) {
          data.cell.styles.valign = 'top';
        }
      }
    });
    
    // Subtotal and Total Section
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    
    // Subtotal
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Subtotal:', pageWidth - 70, finalY);
    doc.text(invoiceData.amount, pageWidth - 25, finalY, { align: 'right' });
    
    // Tax (0% for digital services in India under certain conditions)
    doc.text('GST (18%):', pageWidth - 70, finalY + 8);
    const gstAmount = (parseFloat(invoiceData.amount.replace('₹', '')) * 0.18).toFixed(2);
    doc.text(`₹${gstAmount}`, pageWidth - 25, finalY + 8, { align: 'right' });
    
    // Total Line
    doc.setLineWidth(0.5);
    doc.line(pageWidth - 70, finalY + 15, pageWidth - 15, finalY + 15);
    
    // Total Amount
    doc.setFontSize(12);
    doc.setTextColor(0, 128, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', pageWidth - 70, finalY + 25);
    const totalAmount = (parseFloat(invoiceData.amount.replace('₹', '')) + parseFloat(gstAmount)).toFixed(2);
    doc.text(`₹${totalAmount}`, pageWidth - 25, finalY + 25, { align: 'right' });
    
    // Payment Information
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('Payment Method: UPI/Card', 20, finalY + 45);
    doc.text('Transaction ID: TXN' + Date.now().toString().slice(-8), 20, finalY + 53);
    doc.text(`Next billing date: ${invoiceData.nextBilling}`, 20, finalY + 61);
    
    // Terms and Conditions
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Terms & Conditions:', 20, finalY + 80);
    doc.text('• This invoice is generated electronically and does not require a signature.', 20, finalY + 88);
    doc.text('• Subscription auto-renews unless cancelled 24 hours before billing date.', 20, finalY + 94);
    doc.text('• For support queries, contact us at support@revithalize.com', 20, finalY + 100);
    doc.text('• Refunds processed as per our refund policy available on our website.', 20, finalY + 106);
    
    // Footer
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 270, pageWidth, 25, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('Thank you for choosing Revithalize Mobility for your EV management needs!', pageWidth / 2, 280, { align: 'center' });
    doc.text('This is a computer-generated invoice. For queries, visit www.revithalize.com', pageWidth / 2, 287, { align: 'center' });
    
    return doc.output('blob');
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    // Return a simple fallback PDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 127);
    doc.text('Invoice Generation Error', 20, 30);
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('Unable to generate invoice at this time.', 20, 50);
    doc.text('Please contact support@revithalize.com for assistance.', 20, 65);
    doc.text(`Reference: ${Date.now()}`, 20, 80);
    return doc.output('blob');
  }
};
