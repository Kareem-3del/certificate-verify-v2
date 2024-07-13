import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import { toDataURL } from 'qrcode';
import process from 'node:process';

async function createPdfWithImage(data: {
  fullName: string;
  issued: string;
  expires: string;
  instructorId: string;
  TrainingCenterName: string;
  TrainingCenterId: string;
  instructorName: string;
  eCardCode: string;
  city: string;
  training_site_name: string;
}): Promise<Buffer> {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Load the image
  const imageBytes = fs.readFileSync('IMAGE_TEMPLATE_PATH_CERTIFICATE');

  const pngImage = await pdfDoc.embedPng(imageBytes);

  // Get the dimensions of the image
  const { width, height } = pngImage.scale(0.5);

  // Add a page and draw the image on the center of the page
  const page = pdfDoc.addPage();
  page.drawImage(pngImage, {
    x: page.getWidth() / 2 - width / 2,
    y: page.getHeight() / 2 - height / 2,
    width,
    height,
  });

  // Define font size and color
  const fontSize = 12;
  const fontColor = rgb(0, 0, 0);

  // Draw the text on the certificate at the specified positions
  page.drawText(data.fullName, {
    x: page.getWidth() / 2 - data.fullName.length * fontSize * 0.4,
    y: page.getHeight() / 2 + 80,
    size: fontSize * 1.5,
    color: fontColor,
  });
  page.drawText(data.issued, {
    x: 120,
    y: 380,
    size: fontSize,
    color: fontColor,
  });
  page.drawText(data.expires, {
    x: 390,
    y: 380,
    size: fontSize,
    color: fontColor,
  });
  page.drawText(data.TrainingCenterName, {
    x: 200 - (data.TrainingCenterName.length * fontSize) / 2,
    y: 340,
    size: fontSize,
    color: fontColor,
  });
  page.drawText(data.TrainingCenterId, {
    x: 200 - (data.TrainingCenterId.length * fontSize) / 2,
    y: 300,
    size: fontSize,
    color: fontColor,
  });
  page.drawText(data.instructorName, {
    x: 400 + data.instructorName.length,
    y: 340,
    size: fontSize,
    color: fontColor,
  });
  page.drawText(data.instructorId, {
    x: 380 + data.instructorId.length,
    y: 300,
    size: fontSize,
    color: fontColor,
  });
  page.drawText(data.eCardCode, {
    x: 400,
    y: 260,
    size: fontSize,
    color: fontColor,
  });

  page.drawText(data.city, {
    x: 190 - (data.city.length * fontSize) / 2,
    y: 260,
    size: fontSize,
    color: fontColor,
  });
  page.drawText(data.training_site_name, {
    x: 190 - (data.training_site_name.length * fontSize) / 2,
    y: 220,
    size: fontSize,
    color: fontColor,
  });
  // Generate QR code
  console.log(toDataURL);
  const qrCodeUrl = await toDataURL(
    process.env.BASE_URL + '/certificates/verify/' + data.eCardCode,
  );

  // Extract the base64 part of the QR code URL
  const qrImageBytes = qrCodeUrl.split(',')[1];
  const qrImageBuffer = Buffer.from(qrImageBytes, 'base64');
  const qrImage = await pdfDoc.embedPng(qrImageBuffer);

  // Get the dimensions of the QR code image
  const qrWidth = 60;
  const qrHeight = 60;

  // Draw the QR code image on the page
  page.drawImage(qrImage, {
    x: 405,
    y: 175,
    width: qrWidth,
    height: qrHeight,
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Return the PDF as a Buffer
  return Buffer.from(pdfBytes);
}
