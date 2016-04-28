/**
 * Filename: filteredls.js
 * Author: Joel Sequeira
 * Description: Takes in a directory and file extension as command line args
 *              and prints to output the filenames in that directory containing
 *              the desired extension
 */

//Require the built-in modules
var fs   = require('fs'),
    path = require('path');

//Read the directory, filter out the desired files, and print them
fs.readdir(process.argv[2], function(err, dir) {
  //If there was an error then throw it
  if(err) {
    throw err;
  }

  //Dir is an array of files, so for each one check to see if it has desired
  //extension and if it does then print it
  dir.forEach(function(file) {
    if(path.extname(file) === "." + process.argv[3])
      console.log(file);
  });

});
