
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
    const tableStartY = 180;
    
    autoTable(doc, {
      startY: tableStartY,
      head: [['S.No', 'Description', 'Period', 'Qty', 'Rate (₹)', 'Amount (₹)']],
      body: [
        [
          '1',
          'Revithalize EV Management Premium Subscription',
          invoiceData.billingPeriod,
          '1',
          invoiceData.amount.replace('₹', ''),
          invoiceData.amount.replace('₹', '')
        ],
      ],
      theme: 'striped',
      styles: { 
        fontSize: 10,
        cellPadding: 8,
        textColor: [40, 40, 40],
        halign: 'center',
        valign: 'middle',
        lineColor: [220, 220, 220],
        lineWidth: 0.5
      },
      headStyles: { 
        fillColor: [0, 200, 120],
        textColor: [255, 255, 255],
        fontSize: 11,
        fontStyle: 'bold',
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      columnStyles: {
        0: { cellWidth: 20, halign: 'center' },
        1: { cellWidth: 70, halign: 'left' },
        2: { cellWidth: 30, halign: 'center' },
        3: { cellWidth: 20, halign: 'center' },
        4: { cellWidth: 25, halign: 'right' },
        5: { cellWidth: 25, halign: 'right', fontStyle: 'bold' }
      },
      margin: { left: 20, right: 20 },
      tableWidth: pageWidth - 40
    });
    
    // Calculate amounts with proper GST
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    const baseAmount = parseFloat(invoiceData.amount.replace('₹', ''));
    const cgstAmount = baseAmount * 0.09; // 9% CGST
    const sgstAmount = baseAmount * 0.09; // 9% SGST
    const gstAmount = cgstAmount + sgstAmount; // Total GST 18%
    const totalAmount = baseAmount + gstAmount;
    
    // Professional Summary Section
    const summaryStartX = pageWidth - 110;
    const summaryWidth = 90;
    const summaryStartY = finalY;
    
    // Summary Box with professional styling
    doc.setFillColor(250, 252, 255);
    doc.setDrawColor(0, 200, 120);
    doc.setLineWidth(1);
    doc.rect(summaryStartX, summaryStartY, summaryWidth, 70, 'FD');
    
    // Summary Header
    doc.setFillColor(0, 200, 120);
    doc.rect(summaryStartX, summaryStartY, summaryWidth, 15, 'F');
    
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('AMOUNT SUMMARY', summaryStartX + summaryWidth/2, summaryStartY + 10, { align: 'center' });
    
    // Summary Content
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    
    let yPos = summaryStartY + 25;
    
    // Subtotal
    doc.text('Subtotal:', summaryStartX + 8, yPos);
    doc.text(`₹${baseAmount.toFixed(2)}`, summaryStartX + summaryWidth - 8, yPos, { align: 'right' });
    yPos += 10;
    
    // CGST
    doc.text('CGST @ 9%:', summaryStartX + 8, yPos);
    doc.text(`₹${cgstAmount.toFixed(2)}`, summaryStartX + summaryWidth - 8, yPos, { align: 'right' });
    yPos += 10;
    
    // SGST
    doc.text('SGST @ 9%:', summaryStartX + 8, yPos);
    doc.text(`₹${sgstAmount.toFixed(2)}`, summaryStartX + summaryWidth - 8, yPos, { align: 'right' });
    yPos += 10;
    
    // GST Info line
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('(GST Registration: 29AABCR1234Q1Z5)', summaryStartX + 8, yPos);
    yPos += 8;
    
    // Total line separator
    doc.setLineWidth(1.5);
    doc.setDrawColor(0, 200, 120);
    doc.line(summaryStartX + 8, yPos, summaryStartX + summaryWidth - 8, yPos);
    yPos += 8;
    
    // Total Amount
    doc.setFontSize(12);
    doc.setTextColor(0, 120, 80);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', summaryStartX + 8, yPos);
    doc.text(`₹${totalAmount.toFixed(2)}`, summaryStartX + summaryWidth - 8, yPos, { align: 'right' });
    
    // Payment Information Section
    const paymentInfoY = summaryStartY + 85;
    
    // Payment Info Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(20, paymentInfoY - 5, pageWidth - 40, 50, 'FD');
    
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.setFont('helvetica', 'bold');
    doc.text('PAYMENT INFORMATION', 25, paymentInfoY + 5);
    
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont('helvetica', 'normal');
    
    // Left column
    doc.text(`Transaction ID: RVT${Date.now().toString().slice(-8)}`, 25, paymentInfoY + 18);
    doc.text(`Payment Method: Online Payment (UPI/Card)`, 25, paymentInfoY + 28);
    
    // Right column
    doc.text(`Payment Date: ${invoiceData.date}`, pageWidth/2 + 10, paymentInfoY + 18);
    doc.text(`Next Billing: ${invoiceData.nextBilling}`, pageWidth/2 + 10, paymentInfoY + 28);
    
    // Payment status
    doc.setFontSize(11);
    doc.setTextColor(0, 150, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ Payment Confirmed', 25, paymentInfoY + 38);
    
    // Terms and Conditions
    const termsY = paymentInfoY + 55;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'bold');
    doc.text('Terms & Conditions:', 20, termsY);
    doc.setFont('helvetica', 'normal');
    doc.text('• Payment is processed automatically on the billing date', 20, termsY + 10);
    doc.text('• All prices are inclusive of applicable taxes as per Indian GST regulations', 20, termsY + 18);
    doc.text('• For support queries, contact: support@revithalize.com | +91 7671030069', 20, termsY + 26);
    doc.text('• This is a computer generated invoice and does not require physical signature', 20, termsY + 34);
    
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
