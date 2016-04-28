/**
 * Filename: httpclient.js
 * Author: Joel Sequeira
 * Description: Performs an HTTP GET request to a URL provided
 *              as the first command-line argument and writes
 *              the string contents of each "data" event from
 *              the response on a new line on the console.
 */

//Get the built-in http module
var http = require('http');

//Get the URL input from the command line
http.get(process.argv[2], function(res) {
  //Set the encoding of the response object created to utf8
  res.setEncoding('utf8');

  //If there was an error, print to output and exit
  res.on("error", function(err) {
    console.log(err);
    process.exit(1);
  });

  //Print each data stream to the output
  res.on("data", function(data) {
    console.log(data);
  });

});
