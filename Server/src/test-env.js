import 'dotenv/config';
console.log('Current working directory:', process.cwd());
console.log('Environment variables loaded:', {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Present (length: ' + process.env.OPENAI_API_KEY.length + ')' : 'Not found'
}); 