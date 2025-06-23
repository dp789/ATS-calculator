import { extractTextFromPDF } from '../services/pdfService.js';
import { analyzeWithAI } from '../services/openaiService.js';

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);
    const analysis = await analyzeWithAI(resumeText);

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};