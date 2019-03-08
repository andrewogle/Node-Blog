const express = require('express');
const postRoutes = require('./data/postRouter');
const userRoutes = require('./data/userRouter');
const server = express();

server.use(express.json());

server.use('/api',postRoutes, userRoutes);

server.get('/', (req, res)=>{
    res.send('Hello')
})

module.exports = server;