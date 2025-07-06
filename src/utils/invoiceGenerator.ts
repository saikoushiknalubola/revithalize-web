
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
    
    // Professional Header
    doc.setFillColor(0, 255, 148);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Company Name
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize', pageWidth / 2, 20, { align: 'center' });
    
    // Company Tagline
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.setFont('helvetica', 'normal');
    doc.text('EV Management Solutions', pageWidth / 2, 30, { align: 'center' });
    
    // Invoice Title
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageWidth / 2, 60, { align: 'center' });
    
    // Invoice Details Box
    doc.setDrawColor(0, 255, 148);
    doc.setLineWidth(1);
    doc.rect(15, 70, pageWidth - 30, 25);
    doc.setFillColor(248, 250, 252);
    doc.rect(15, 70, pageWidth - 30, 25, 'F');
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, 80);
    doc.text(`Date: ${invoiceData.date}`, 20, 87);
    doc.text(`Status: PAID`, pageWidth - 50, 80);
    doc.text(`Due: ${invoiceData.nextBilling}`, pageWidth - 50, 87);
    
    // Customer Information
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 110);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(invoiceData.customer, 20, 120);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.email, 20, 128);
    
    // Company Information
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('From:', pageWidth - 80, 110);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize', pageWidth - 20, 120, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.text('Bangalore, India', pageWidth - 20, 128, { align: 'right' });
    
    // Services Table
    autoTable(doc, {
      startY: 140,
      head: [['Service Description', 'Period', 'Qty', 'Rate', 'Amount']],
      body: [
        [
          'EV Management Premium Subscription',
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
        textColor: [60, 60, 60],
      },
      headStyles: { 
        fillColor: [0, 255, 148], 
        textColor: [0, 0, 0],
        fontSize: 10,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 40 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 25, halign: 'right' },
        4: { cellWidth: 25, halign: 'right', fontStyle: 'bold' }
      }
    });
    
    // Financial Summary
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    const baseAmount = parseFloat(invoiceData.amount.replace('₹', ''));
    const gstAmount = baseAmount * 0.18;
    const totalAmount = baseAmount + gstAmount;
    
    // Summary Box
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(pageWidth - 70, finalY, 55, 35);
    
    // Financial Details
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal:', pageWidth - 65, finalY + 10);
    doc.text(`₹${baseAmount.toFixed(2)}`, pageWidth - 20, finalY + 10, { align: 'right' });
    
    doc.text('GST (18%):', pageWidth - 65, finalY + 18);
    doc.text(`₹${gstAmount.toFixed(2)}`, pageWidth - 20, finalY + 18, { align: 'right' });
    
    // Total Amount
    doc.setLineWidth(1);
    doc.setDrawColor(0, 255, 148);
    doc.line(pageWidth - 65, finalY + 22, pageWidth - 20, finalY + 22);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 100, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', pageWidth - 65, finalY + 30);
    doc.text(`₹${totalAmount.toFixed(2)}`, pageWidth - 20, finalY + 30, { align: 'right' });
    
    // Payment Information
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('Payment Information:', 20, finalY + 45);
    doc.text(`Transaction ID: RVT${Date.now().toString().slice(-8)}`, 20, finalY + 53);
    doc.text(`Next Billing: ${invoiceData.nextBilling}`, 20, finalY + 61);
    
    // Terms
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Terms: Invoice is auto-generated. Contact support@revithalize.com for queries.', 20, finalY + 75);
    
    // Footer
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 270, pageWidth, 25, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for choosing Revithalize!', pageWidth / 2, 280, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, pageWidth / 2, 287, { align: 'center' });
    
    return doc.output('blob');
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    
    // Fallback PDF
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setTextColor(220, 38, 127);
    doc.text('Invoice Generation Error', 20, 30);
    
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    doc.text('Unable to generate invoice. Please contact support.', 20, 50);
    doc.text(`Reference: RVT-ERR-${Date.now()}`, 20, 70);
    
    return doc.output('blob');
  }
};
