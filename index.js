const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const buildFilePath = (filename) => path.join(__dirname, 'public', filename);

const server = http.createServer((req, res) => {
  // default content type
  const contentType = 'text/html';
  
  // read the file
  fs.readFile(
    buildFilePath(req.url === '/' ? 'index.html' : req.url),
    (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // page not found
          fs.readFile(buildFilePath('404.html'), (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
          });
        } else {
          // internal server error
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
        return;
      }

      // ok
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  );
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));