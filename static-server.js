// Simple static server to serve the production build
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable compression for all responses
app.use(compression());

// Serve static files from the 'out' directory
app.use(express.static(path.join(__dirname, 'out')));

// For any request that doesn't match a static file, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 