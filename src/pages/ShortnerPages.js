import React from 'react';
import { Typography, Box } from '@mui/material';
import UrlShortener from '../components/UrlShortener';

const ShortenerPage = ({ addShortenedUrl }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <Typography variant="body1" paragraph>
        Shorten up to 5 URLs concurrently. For each URL, you can provide the original URL, 
        an optional validity period (in minutes), and an optional preferred short code.
      </Typography>
      <UrlShortener addShortenedUrl={addShortenedUrl} />
    </Box>
  );
};

export default ShortenerPage;