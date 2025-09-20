import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Alert,
  Paper
} from '@mui/material';
import { ContentCopy, Add, Delete } from '@mui/icons-material';

const UrlShortener = ({ addShortenedUrl }) => {
  const [urls, setUrls] = useState([
    { originalUrl: '', validity: '', preferredShort: '' }
  ]);
  const [errors, setErrors] = useState([{}]);
  const [successMessages, setSuccessMessages] = useState(['']);

  const validateUrl = (url) => {
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return pattern.test(url);
  };

  const validateShortCode = (code) => {
    if (!code) return true;
    const pattern = /^[a-zA-Z0-9_-]+$/;
    return pattern.test(code);
  };

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);

    const newErrors = [...errors];
    newErrors[index] = {...newErrors[index]};
    
    if (field === 'originalUrl' && value && !validateUrl(value)) {
      newErrors[index].originalUrl = 'Please enter a valid URL';
    } else if (field === 'originalUrl') {
      delete newErrors[index].originalUrl;
    }

    if (field === 'preferredShort' && value && !validateShortCode(value)) {
      newErrors[index].preferredShort = 'Short code can only contain letters, numbers, underscores, and hyphens';
    } else if (field === 'preferredShort') {
      delete newErrors[index].preferredShort;
    }

    setErrors(newErrors);
  };

  const handleAddUrl = () => {
    if (urls.length < 5) {
      setUrls([...urls, { originalUrl: '', validity: '', preferredShort: '' }]);
      setErrors([...errors, {}]);
      setSuccessMessages([...successMessages, '']);
    }
  };

  const handleRemoveUrl = (index) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
      
      const newErrors = errors.filter((_, i) => i !== index);
      setErrors(newErrors);
      
      const newSuccessMessages = successMessages.filter((_, i) => i !== index);
      setSuccessMessages(newSuccessMessages);
    }
  };

  const handleSubmit = (index) => {
    const url = urls[index];
    const newErrors = {...errors[index]};
    
    if (!url.originalUrl) {
      newErrors.originalUrl = 'URL is required';
    } else if (!validateUrl(url.originalUrl)) {
      newErrors.originalUrl = 'Please enter a valid URL';
    }
    
    if (url.preferredShort && !validateShortCode(url.preferredShort)) {
      newErrors.preferredShort = 'Short code can only contain letters, numbers, underscores, and hyphens';
    }
    
    if (Object.keys(newErrors).length > 0) {
      const allErrors = [...errors];
      allErrors[index] = newErrors;
      setErrors(allErrors);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      const shortUrl = url.preferredShort 
        ? `https://short.url/${url.preferredShort}`
        : `https://short.url/${Math.random().toString(36).substring(2, 8)}`;
      
      const newUrlData = {
        originalUrl: url.originalUrl,
        shortUrl,
        validity: url.validity || 'N/A',
        createdAt: new Date().toISOString()
      };
      
      addShortenedUrl(newUrlData);
      
      const newSuccessMessages = [...successMessages];
      newSuccessMessages[index] = `URL shortened successfully!`;
      setSuccessMessages(newSuccessMessages);
    }, 500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box>
      {urls.map((url, index) => (
        <Paper key={index} elevation={2} className="url-item">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Original URL"
                value={url.originalUrl}
                onChange={(e) => handleInputChange(index, 'originalUrl', e.target.value)}
                error={!!errors[index]?.originalUrl}
                helperText={errors[index]?.originalUrl}
                placeholder="https://example.com"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Validity (minutes)"
                type="number"
                value={url.validity}
                onChange={(e) => handleInputChange(index, 'validity', e.target.value)}
                InputProps={{ inputProps: { min: 1 } }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Preferred Short Code (optional)"
                value={url.preferredShort}
                onChange={(e) => handleInputChange(index, 'preferredShort', e.target.value)}
                error={!!errors[index]?.preferredShort}
                helperText={errors[index]?.preferredShort}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleSubmit(index)}
                disabled={!!errors[index]?.originalUrl || !!errors[index]?.preferredShort}
              >
                Shorten
              </Button>
              {urls.length > 1 && (
                <IconButton 
                  color="error" 
                  onClick={() => handleRemoveUrl(index)}
                  sx={{ mt: 1 }}
                >
                  <Delete />
                </IconButton>
              )}
            </Grid>
          </Grid>
          
          {successMessages[index] && (
            <Alert 
              severity="success" 
              sx={{ mt: 2 }}
              action={
                url.shortUrl && (
                  <IconButton 
                    size="small" 
                    onClick={() => copyToClipboard(url.shortUrl)}
                  >
                    <ContentCopy />
                  </IconButton>
                )
              }
            >
              {successMessages[index]} {url.shortUrl && `Short URL: ${url.shortUrl}`}
            </Alert>
          )}
        </Paper>
      ))}
      
      {urls.length < 5 && (
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleAddUrl}
          sx={{ mt: 2 }}
        >
          Add Another URL
        </Button>
      )}
    </Box>
  );
};

export default UrlShortener;