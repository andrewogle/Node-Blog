const express = require("express");
const mainRouter = require('./routers/router');
const server = express();

server.use(express.json());

server.use("/", mainRouter);

server.get("/", async (req, res) => {
  res.send("Hello");
});

module.exports = server;
