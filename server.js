"use strict";
const express = require('express');
const app = express();
const RateLimit = require('express-rate-limit');
const controller = require('./controller');

var router = express.Router();
var apiLimiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100,
    delayMs: 0 // disabled
  });

// here we map server URL to a command 
router.route('/danny/ls').get(controller.doLScommandAsync);

app.use('/', router);
app.use('/', apiLimiter);



let port = 3000;
var server =  app.listen(port , function() {
  let host = server.address().address
  let port = server.address().port
  console.log(`danny server is listenning on ${host}:${port}`);
});

module.exports = app;
