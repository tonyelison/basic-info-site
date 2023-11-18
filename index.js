const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const TEXT_HTML = 'text/html';
const UTF8 = 'utf8';

const buildFilePath = (filename) => path.join(__dirname, 'public', filename);

const server = http.createServer((req, res) => {  
  // read the file
  fs.readFile(
    buildFilePath(`${req.url === '/' ? 'index' : req.url}.html`),
    (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // page not found
          fs.readFile(buildFilePath('404.html'), (err, content) => {
            res.writeHead(200, { 'Content-Type': TEXT_HTML });
            res.end(content, UTF8);
          });
        } else {
          // internal server error
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
        return;
      }

      // ok
      res.writeHead(200, { 'Content-Type': TEXT_HTML });
      res.end(content, UTF8);
    }
  );
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));