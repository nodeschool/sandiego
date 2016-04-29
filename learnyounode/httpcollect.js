/**
 * Filename: httpcollect.js
 * Author: Joel Sequeira
 * Description: Performs an HTTP GET request to a URL provided as the first
 *              command-line argument and writes all the data collected from
 *              the server to the output.
 */

//Require the built-in modules
var http = require('http'),
    bl   = require('bl'); //bl is to get piped output

//Get the URL input from the command line
http.get(process.argv[2], function(res){
  //Set the encoding of the response object created to utf8
  res.setEncoding('utf-8');

  //Pipe all the data from the response object
  res.pipe(bl(function(err,data){
    //If there was en error output it and exit
    if(err) {
      console.log(err);
      process.exit(1);
    }

    //Convert the data buffer into a string
    var str = data.toString();
    //Output the total number of characters
    console.log(str.length);
    //Output all the data collected
    console.log(str);
  }));

});
