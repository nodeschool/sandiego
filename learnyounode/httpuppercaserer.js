/**
 * Filename: httpuppercaserer.js
 * Author: Joel Sequeira
 * Description: Listens for HTTP requests with a body and converts the entire
 *              body to upper case and returns it in the response.
 */

//Require the built-in http module which creates the http server and the
//through2-map module to transform the body of the request.
var http = require('http'),
    map  = require('through2-map');

//Create the HTTP server
var server = http.createServer(function(req,res){
  //Pipe the request into the map to convert the body into uppercase and then
  //pipe into the response
  req.pipe(map(function(chunk){
    return chunk.toString().toUpperCase();
  })).pipe(res);
});

//Listen for connections on the port input in the first command-line arg
server.listen(process.argv[2]);
