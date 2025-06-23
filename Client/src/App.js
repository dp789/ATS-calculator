import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Button
} from '@mui/material';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setAnalysis(null);
    setError(null);
  };

  const analyzeResume = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Resume ATS Analyzer
        </Typography>

        <Box sx={{ my: 3 }}>
          <input
            accept=".pdf"
            style={{ display: 'none' }}
            id="resume-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="resume-upload">
            <Button
              variant="contained"
              component="span"
              disabled={loading}
            >
              Upload Resume
            </Button>
          </label>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {file.name}
            </Typography>
          )}
        </Box>

        {file && (
          <Button
            variant="contained"
            color="primary"
            onClick={analyzeResume}
            disabled={loading}
            sx={{ mb: 3 }}
          >
            Analyze Resume
          </Button>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ my: 2 }}>
            {error}
          </Typography>
        )}

        {analysis && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              ATS Score
            </Typography>
            <LinearProgress
              variant="determinate"
              value={analysis.score}
              sx={{ height: 10, borderRadius: 5, mb: 2 }}
            />
            <Typography variant="body1" gutterBottom>
              Score: {analysis.score}%
            </Typography>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Suggestions for Improvement
            </Typography>
            <List>
              {analysis.suggestions.map((suggestion, index) => (
                <ListItem key={index}>
                  <ListItemText primary={suggestion} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Missing Keywords
            </Typography>
            <List>
              {analysis.missingKeywords.map((keyword, index) => (
                <ListItem key={index}>
                  <ListItemText primary={keyword} />
                </ListItem>
              ))}
            </List>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Format Issues
            </Typography>
            <List>
              {analysis.formatIssues.map((issue, index) => (
                <ListItem key={index}>
                  <ListItemText primary={issue} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default App;