const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.json': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let filePath = '.' + (req.url === '/' ? '/index.html' : req.url.split('?')[0]);
  filePath = path.normalize(filePath);

  const ext = path.extname(filePath);
  const ct = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Keep alive
  setInterval(() => {}, 60000);
});
