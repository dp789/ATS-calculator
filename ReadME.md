# Resume ATS Analyzer

An AI-powered resume analysis tool that calculates ATS scores and provides optimization suggestions.

## Features
- PDF Resume parsing
- ATS Score calculation using AI
- Detailed improvement suggestions
- Missing keywords identification
- Format analysis
- Modern, responsive UI

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd resume-ats-analyzer
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Configure environment variables
```bash
# In the server directory
cp .env.example .env
# Edit .env with your OpenAI API key
```

4. Start the application
```bash
# Start the server (from server directory)
npm start

# Start the client (from client directory)
npm start
```

## Usage
1. Open your browser and navigate to `http://localhost:3000`
2. Upload your resume in PDF format
3. Click "Analyze Resume" to get your ATS score and suggestions
4. Review the detailed analysis and improvement suggestions

## Technologies Used
- Frontend: React, Material-UI
- Backend: Node.js, Express
- AI: OpenAI GPT-4
- PDF Processing: pdf-parse