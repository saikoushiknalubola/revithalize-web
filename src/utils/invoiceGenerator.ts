
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
    
    // Company Header
    doc.setFillColor(0, 200, 120);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    // Company Name
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize', pageWidth / 2, 20, { align: 'center' });
    
    // Company Tagline
    doc.setFontSize(11);
    doc.setTextColor(240, 240, 240);
    doc.setFont('helvetica', 'normal');
    doc.text('Advanced EV Management Solutions', pageWidth / 2, 28, { align: 'center' });
    
    // Invoice Title
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageWidth / 2, 50, { align: 'center' });
    
    // Invoice Details
    doc.setDrawColor(0, 200, 120);
    doc.setLineWidth(0.5);
    doc.rect(15, 60, pageWidth - 30, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(`Invoice #: ${invoiceData.invoiceNumber}`, 20, 68);
    doc.text(`Date: ${invoiceData.date}`, 20, 74);
    doc.text(`Status: PAID`, pageWidth - 50, 68);
    doc.text(`Due: ${invoiceData.nextBilling}`, pageWidth - 50, 74);
    
    // Customer Information
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 95);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(invoiceData.customer, 20, 105);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.email, 20, 112);
    
    // Company Information
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('From:', pageWidth - 70, 95);
    
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize Technologies Inc', pageWidth - 20, 105, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.text('1234 Innovation Drive, Suite 567', pageWidth - 20, 112, { align: 'right' });
    doc.text('San Francisco, CA 94105', pageWidth - 20, 119, { align: 'right' });
    doc.text('United States', pageWidth - 20, 126, { align: 'right' });
    doc.text('Tax ID: 12-3456789', pageWidth - 20, 133, { align: 'right' });
    
    // Services Table with proper spacing
    autoTable(doc, {
      startY: 145,
      head: [['Description', 'Period', 'Qty', 'Rate', 'Amount']],
      body: [
        [
          'Revithalize EV Management\nPremium Subscription',
          invoiceData.billingPeriod,
          '1',
          invoiceData.amount,
          invoiceData.amount
        ],
      ],
      theme: 'grid',
      styles: { 
        fontSize: 10, 
        cellPadding: 6,
        textColor: [60, 60, 60],
        overflow: 'linebreak',
        halign: 'left'
      },
      headStyles: { 
        fillColor: [0, 200, 120], 
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 80, halign: 'left' },
        1: { cellWidth: 40, halign: 'center' },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
      },
      margin: { left: 15, right: 15 }
    });
    
    // Calculate totals
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    const baseAmount = parseFloat(invoiceData.amount.replace('₹', ''));
    const gstAmount = baseAmount * 0.18;
    const totalAmount = baseAmount + gstAmount;
    
    // Financial Summary - properly positioned
    const summaryX = pageWidth - 75;
    const summaryY = finalY;
    const summaryWidth = 60;
    const summaryHeight = 40;
    
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(summaryX, summaryY, summaryWidth, summaryHeight);
    
    // Summary content
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    
    doc.text('Subtotal:', summaryX + 5, summaryY + 10);
    doc.text(`₹${baseAmount.toFixed(2)}`, summaryX + summaryWidth - 5, summaryY + 10, { align: 'right' });
    
    doc.text('Tax (18%):', summaryX + 5, summaryY + 20);
    doc.text(`₹${gstAmount.toFixed(2)}`, summaryX + summaryWidth - 5, summaryY + 20, { align: 'right' });
    
    // Total line
    doc.setLineWidth(0.8);
    doc.setDrawColor(0, 200, 120);
    doc.line(summaryX + 5, summaryY + 25, summaryX + summaryWidth - 5, summaryY + 25);
    
    doc.setFontSize(12);
    doc.setTextColor(0, 150, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', summaryX + 5, summaryY + 33);
    doc.text(`₹${totalAmount.toFixed(2)}`, summaryX + summaryWidth - 5, summaryY + 33, { align: 'right' });
    
    // Payment Information
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('Payment Information:', 20, finalY + 50);
    doc.text(`Transaction ID: RVT${Date.now().toString().slice(-8)}`, 20, finalY + 58);
    doc.text(`Payment Method: Online Payment`, 20, finalY + 66);
    doc.text(`Next Billing Date: ${invoiceData.nextBilling}`, 20, finalY + 74);
    
    // Terms and Conditions
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Terms & Conditions:', 20, finalY + 90);
    doc.text('• Payment is processed automatically on the billing date', 20, finalY + 97);
    doc.text('• All prices are inclusive of applicable taxes', 20, finalY + 103);
    doc.text('• For support queries, contact: support@revithalize.com', 20, finalY + 109);
    
    // Footer
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 265, pageWidth, 30, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for choosing Revithalize - Powering the Future of Electric Mobility', pageWidth / 2, 275, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, 285, { align: 'center' });
    
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
