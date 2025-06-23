import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { analyzeResume } from './controllers/resumeController.js';
import 'dotenv/config';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/analyze-resume', upload.single('resume'), analyzeResume);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});