const express = require('express');

const accountRouter = require('./Router/accountRouter.js');

const server = express();

server.use(express.json());
server.use('/api/account', accountRouter);

server.get('/', (req, res) => {
    res.send('<h1>Your server is up and runing </h1>')
})

module.exports = server;