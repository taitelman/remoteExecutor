"use strict";
const express = require('express');
const app = express();
const RateLimit = require('express-rate-limit');

var router = express.Router();
var apiLimiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100,
    delayMs: 0 // disabled
  });

// here we map server URL to a command 
router.route('/danny/ls').get(doLScommandAsync);

app.use('/', router);
app.use('/', apiLimiter);

async function doLScommandAsync(req, res) {
  console.log('going to execute ls -la');
  const { stdout, stderr } = await exec('ls -la');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  res.json("OK");
}

function doCommandSync(req, res) {
  const { stdout, stderr } = execSync('ls');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  res.json("OK");
}

let port = 3000;
app.listen(port);
console.log('danny server is listenning on port:'+port);
module.exports = app;
