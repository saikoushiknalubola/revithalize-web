
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
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 128, 0);
    doc.text('Revithalize Mobility', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text('EV Management Solutions', pageWidth / 2, 27, { align: 'center' });
    doc.text('support@revithalize.com | +91 7671030069', pageWidth / 2, 32, { align: 'center' });
    
    // Line separator
    doc.setDrawColor(0, 128, 0);
    doc.setLineWidth(0.5);
    doc.line(15, 38, pageWidth - 15, 38);
    
    // Invoice title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('INVOICE', pageWidth / 2, 50, { align: 'center' });
    
    // Invoice details
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, 65);
    doc.text(`Date: ${invoiceData.date}`, pageWidth - 60, 65);
    
    // Customer info
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text('Bill To:', 20, 80);
    
    doc.setFontSize(10);
    doc.text(invoiceData.customer, 20, 88);
    doc.text(invoiceData.email, 20, 95);
    
    // Invoice table
    autoTable(doc, {
      startY: 110,
      head: [['Description', 'Period', 'Amount']],
      body: [
        [invoiceData.plan, invoiceData.billingPeriod, invoiceData.amount],
      ],
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 8 },
      headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 60 },
        2: { cellWidth: 40, halign: 'right' }
      }
    });
    
    // Total section
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text('Total Amount:', pageWidth - 80, finalY);
    doc.setFontSize(14);
    doc.setTextColor(0, 128, 0);
    doc.text(invoiceData.amount, pageWidth - 40, finalY, { align: 'right' });
    
    // Next billing info
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Next billing date: ${invoiceData.nextBilling}`, 20, finalY + 20);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for choosing Revithalize Mobility!', pageWidth / 2, 280, { align: 'center' });
    doc.text('This is a computer-generated invoice.', pageWidth / 2, 285, { align: 'center' });
    
    return doc.output('blob');
  } catch (error) {
    console.error('Error generating invoice PDF:', error);
    // Return a simple fallback PDF
    const doc = new jsPDF();
    doc.text('Error generating invoice. Please contact support.', 20, 20);
    return doc.output('blob');
  }
};
