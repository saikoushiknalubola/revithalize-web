
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
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Company Header Background
    doc.setFillColor(0, 200, 120);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Company Name
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize Mobility', pageWidth / 2, 18, { align: 'center' });
    
    // Company Tagline
    doc.setFontSize(10);
    doc.setTextColor(240, 240, 240);
    doc.setFont('helvetica', 'normal');
    doc.text('Advanced EV Management Solutions', pageWidth / 2, 25, { align: 'center' });
    
    // Company Address Block
    doc.setFontSize(8);
    doc.setTextColor(230, 230, 230);
    doc.setFont('helvetica', 'normal');
    doc.text('ReVithalize Innovations, Corporate Headquarters', pageWidth / 2, 32, { align: 'center' });
    doc.text('plt no 54/5-6 Nakkalagutta, Hanamakonda, Telangana 506001, Bharat (India)', pageWidth / 2, 36, { align: 'center' });
    
    // Invoice Title
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', pageWidth / 2, 55, { align: 'center' });
    
    // Invoice Details Box
    doc.setFillColor(248, 249, 250);
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.rect(15, 65, pageWidth - 30, 25, 'FD');
    
    // Invoice Details Content
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Invoice Number:', 20, 72);
    doc.text('Invoice Date:', 20, 78);
    doc.text('Status:', 20, 84);
    
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.invoiceNumber, 55, 72);
    doc.text(invoiceData.date, 55, 78);
    doc.text('PAID', 55, 84);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Due Date:', pageWidth - 80, 72);
    doc.text('GST Number:', pageWidth - 80, 78);
    doc.text('PAN Number:', pageWidth - 80, 84);
    
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.nextBilling, pageWidth - 45, 72);
    doc.text('29AABCR1234Q1Z5', pageWidth - 45, 78);
    doc.text('AABCR1234Q', pageWidth - 45, 84);
    
    // Bill To Section
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL TO:', 20, 105);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text(invoiceData.customer, 20, 115);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.email, 20, 122);
    
    // Bill From Section
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('BILL FROM:', pageWidth - 80, 105);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'bold');
    doc.text('Revithalize Mobility', pageWidth - 20, 115, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.text('ReVithalize Innovations', pageWidth - 20, 122, { align: 'right' });
    doc.text('plt no 54/5-6 Nakkalagutta', pageWidth - 20, 129, { align: 'right' });
    doc.text('Hanamakonda, Telangana 506001', pageWidth - 20, 136, { align: 'right' });
    doc.text('Bharat (India)', pageWidth - 20, 143, { align: 'right' });
    doc.text('Tel: +91 7671030069', pageWidth - 20, 150, { align: 'right' });
    doc.text('Email: support@revithalize.com', pageWidth - 20, 157, { align: 'right' });
    doc.text('Web: revithalize.oddo.com', pageWidth - 20, 164, { align: 'right' });
    
    // Services Table
    const tableStartY = 175;
    
    autoTable(doc, {
      startY: tableStartY,
      head: [['S.No', 'Description', 'Period', 'Qty', 'Rate (₹)', 'Amount (₹)']],
      body: [
        [
          '1',
          'Revithalize EV Management\nPremium Subscription',
          invoiceData.billingPeriod,
          '1',
          invoiceData.amount.replace('₹', ''),
          invoiceData.amount.replace('₹', '')
        ],
      ],
      theme: 'grid',
      styles: { 
        fontSize: 9,
        cellPadding: 4,
        textColor: [60, 60, 60],
        halign: 'center',
        valign: 'middle'
      },
      headStyles: { 
        fillColor: [0, 200, 120],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 60, halign: 'left' },
        2: { cellWidth: 35, halign: 'center' },
        3: { cellWidth: 15, halign: 'center' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 30, halign: 'right', fontStyle: 'bold' }
      },
      margin: { left: 15, right: 15 },
      tableWidth: pageWidth - 30
    });
    
    // Calculate amounts
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const baseAmount = parseFloat(invoiceData.amount.replace('₹', ''));
    const cgstAmount = baseAmount * 0.09;
    const sgstAmount = baseAmount * 0.09;
    const totalAmount = baseAmount + cgstAmount + sgstAmount;
    
    // Summary Section
    const summaryStartX = pageWidth - 90;
    const summaryWidth = 75;
    
    // Summary Box
    doc.setFillColor(248, 249, 250);
    doc.setDrawColor(220, 220, 220);
    doc.rect(summaryStartX, finalY, summaryWidth, 50, 'FD');
    
    // Summary Content
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    
    doc.text('Subtotal:', summaryStartX + 5, finalY + 8);
    doc.text(`₹${baseAmount.toFixed(2)}`, summaryStartX + summaryWidth - 5, finalY + 8, { align: 'right' });
    
    doc.text('CGST (9%):', summaryStartX + 5, finalY + 16);
    doc.text(`₹${cgstAmount.toFixed(2)}`, summaryStartX + summaryWidth - 5, finalY + 16, { align: 'right' });
    
    doc.text('SGST (9%):', summaryStartX + 5, finalY + 24);
    doc.text(`₹${sgstAmount.toFixed(2)}`, summaryStartX + summaryWidth - 5, finalY + 24, { align: 'right' });
    
    // Total line
    doc.setLineWidth(1);
    doc.setDrawColor(0, 200, 120);
    doc.line(summaryStartX + 5, finalY + 30, summaryStartX + summaryWidth - 5, finalY + 30);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 150, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', summaryStartX + 5, finalY + 38);
    doc.text(`₹${totalAmount.toFixed(2)}`, summaryStartX + summaryWidth - 5, finalY + 38, { align: 'right' });
    
    // Payment Information
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Information:', 20, finalY + 65);
    
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(`Transaction ID: RVT${Date.now().toString().slice(-8)}`, 20, finalY + 73);
    doc.text(`Payment Method: Online Payment`, 20, finalY + 80);
    doc.text(`Payment Date: ${invoiceData.date}`, 20, finalY + 87);
    doc.text(`Next Billing: ${invoiceData.nextBilling}`, 20, finalY + 94);
    
    // Terms and Conditions
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions:', 20, finalY + 108);
    doc.setFont('helvetica', 'normal');
    doc.text('• Payment is processed automatically on the billing date', 20, finalY + 115);
    doc.text('• All prices are inclusive of applicable taxes as per Indian GST regulations', 20, finalY + 121);
    doc.text('• For support queries, contact: support@revithalize.com | +91 7671030069', 20, finalY + 127);
    doc.text('• This is a computer generated invoice and does not require physical signature', 20, finalY + 133);
    
    // Footer
    doc.setFillColor(245, 245, 245);
    doc.rect(0, pageHeight - 25, pageWidth, 25, 'F');
    
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.setFont('helvetica', 'normal');
    doc.text('Thank you for choosing Revithalize - Powering the Future of Electric Mobility', pageWidth / 2, pageHeight - 15, { align: 'center' });
    doc.text(`Generated on: ${new Date().toLocaleString('en-IN')} | Visit: revithalize.oddo.com`, pageWidth / 2, pageHeight - 8, { align: 'center' });
    
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
