/**
 * Filename: myfirstio.js
 * Author: Joel Sequeira
 * Description: Takes in a file to read as a command line argument and
 *              uses a single synchronous file system operation to count the
 *              number of new lines in the file.
 */


//Require the file system module
var fs = require('fs');

//Synchronously read the file
var buffer = fs.readFileSync(process.argv[2]);

//Convert the buffer to a string
var str = buffer.toString();

//Split the string into sub strings by seperating them at the newline character
var array = str.split('\n');

//The length of the array - 1 is the total lines (subtract one because last
//character of the file is a newline so one extra line)
console.log(array.length - 1);
