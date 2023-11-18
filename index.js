const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.write('hello, world');
  res.end();
});

server.listen(PORT, () => console.log(`server running on port ${PORT}`));