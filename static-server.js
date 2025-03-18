const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Default to index.html
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Write a simple index.html file for testing
  if (filePath === './index.html' && !fs.existsSync('./index.html')) {
    fs.writeFileSync('./index.html', `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Portfolio Test Page</title>
        </head>
        <body>
          <h1>Portfolio Test Page</h1>
          <p>If you can see this page, the server is working!</p>
        </body>
      </html>
    `);
  }

  // Get the file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  
  // MIME types
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read the file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}); 