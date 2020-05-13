const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server on port ${server.address().port}`);
});

