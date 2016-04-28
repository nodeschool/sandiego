/**
 * Filename: myfirstasyncio.js
 * Author: Joel Sequeira
 * Description: Takes in a file to read as a command line argument and
 *              uses a single asynchronous file system operation to count the
 *              number of new lines in the file.
 */

//Require the file system module
var fs = require('fs');

//Asynchronously read the file and pass the result into a callback function
fs.readFile(process.argv[2], function(err, file) {
  //If there was an error, output it and return
  if(err) {
    console.log(err);
    return;
  }

  //Convert the buffer into a string
  var str = file.toString();

  //Split the string into substrings by seperating the new line characters
  var array = str.split('\n');

  //The length of the array - 1 is the total lines (subtract one because last
  //character of the file is a newline so one extra line)
  console.log(array.length - 1);
});
