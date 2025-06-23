import pdfParse from 'pdf-parse/lib/pdf-parse.js';

export const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const data = await pdfParse(pdfBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Error parsing PDF: ' + error.message);
  }
};