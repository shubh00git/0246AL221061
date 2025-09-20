import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [value, setValue] = useState(0);
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const addShortenedUrl = (newUrl) => {
    setShortenedUrls(prev => [...prev, newUrl]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                URL Shortener
              </Typography>
              <Tabs value={value} onChange={handleTabChange} textColor="inherit">
                <Tab label="URL Shortener" component={Link} to="/" />
                <Tab label="Statistics" component={Link} to="/statistics" />
              </Tabs>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<ShortenerPage addShortenedUrl={addShortenedUrl} />} />
              <Route path="/statistics" element={<StatisticsPage shortenedUrls={shortenedUrls} />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;