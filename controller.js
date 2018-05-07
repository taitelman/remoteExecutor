const { exec } = require('child_process');

var commands = {

    doLScommandAsync : async function(req, res) {
        console.log('going to execute ls -la');
        const { stdout, stderr } = await exec('ls -la');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
        res.send("OK");
      }
      
      ,doCommandSync : function (req, res) {
        const { stdout, stderr } = execSync('ls');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
        res.json("OK");
      }
};

module.exports = commands;