require('dotenv').config();

const createServer = require('./createServer');

const server = createServer();

server.start({port: process.env.PORT || 7777}, () => console.log(`The server is running on port 7777`));
