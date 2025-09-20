import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import { ContentCopy, OpenInNew } from '@mui/icons-material';

const UrlStatistics = ({ shortenedUrls }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const openUrl = (url) => {
    window.open(url, '_blank');
  };

  if (shortenedUrls.length === 0) {
    return (
      <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
        <p>No shortened URLs yet. Go to the Shortener page to create some!</p>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} className="statistics-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Shortened URL</TableCell>
            <TableCell>Validity</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shortenedUrls.map((url, index) => (
            <TableRow key={index}>
              <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {url.originalUrl}
              </TableCell>
              <TableCell>
                <Chip 
                  label={url.shortUrl} 
                  variant="outlined"
                  onClick={() => openUrl(url.shortUrl)}
                  onDelete={() => copyToClipboard(url.shortUrl)}
                  deleteIcon={<ContentCopy />}
                />
              </TableCell>
              <TableCell>{url.validity}</TableCell>
              <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => openUrl(url.shortUrl)}>
                  <OpenInNew />
                </IconButton>
                <IconButton onClick={() => copyToClipboard(url.shortUrl)}>
                  <ContentCopy />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrlStatistics;