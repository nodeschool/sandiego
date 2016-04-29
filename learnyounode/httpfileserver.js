/**
 * Filename: timeserver.js
 * Author: Joel Sequeira
 * Description: Server that listens for HTTP requests on the port listed in the
 *              first command-line arg and responds by sending a file that is
 *              input in the second command-line arg.
 */

//Require the http and fs built-in modules
var http = require('http'),
    fs   = require('fs');

//Create the http server to handle requests and send the responde
var server = http.createServer(function(req,res){
  //Pipe the source file into the destination which is the response
  fs.createReadStream(process.argv[3]).pipe(res);
});

//Listen for connections on the port input in the first command-line arg
server.listen(process.argv[2]);
