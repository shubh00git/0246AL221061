import React from 'react';
import { Typography, Box } from '@mui/material';
import UrlStatistics from '../components/UrlStatistics';

const StatisticsPage = ({ shortenedUrls }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        URL Shortener Statistics
      </Typography>
      <Typography variant="body1" paragraph>
        View all shortened URLs created in the current session.
      </Typography>
      <UrlStatistics shortenedUrls={shortenedUrls} />
    </Box>
  );
};

export default StatisticsPage;