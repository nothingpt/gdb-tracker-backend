require('dotenv').config();

const createServer = require('./createServer');

const server = createServer();

const opts = {
  port: 7777,
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"] // your frontend url.
  }
};

server.start(opts, () => console.log(`The server is running on port 7777`));
