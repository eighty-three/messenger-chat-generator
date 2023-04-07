require('dotenv').config();
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const server = http.createServer(app);

const projectPath = (process.env.NODE_ENV !== 'production')
  ? '/'
  : '/projects/messenger-chat-generator'

app.use('/static', express.static(path.join(__dirname, 'build')));

app.get(projectPath, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'error.html'));
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server on port ${server.address().port}`);
});

