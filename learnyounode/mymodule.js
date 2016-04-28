/**
 * Filename: mymodule.js
 * Author: Joel Sequeira
 * Description: Module that exports a function that takes in a directory name,
 *              extension and callback as input and returns all the files in
 *              that directory containing that extension in the callback.
 */


//Require built-in modules
var fs   = require('fs'),
    path = require('path');

/**
 * Function name: mymodule
 * Description: takes in a directory name and extension and filters out
 *              all the files in that directory containing that extension
 * Input: dirname - the name of the directory to look for the filters
 *        extension - the extension of files
 *        callback - callback containing the filtered file names
 * Output: None.
 * Return: callback with only error if error was found, or with filtered
 *         filenames.
 */
function mymodule(dirname, extension, callback) {
  //Read the directory
  fs.readdir(dirname, (err, dir) => {
    //If there was an error return it with the callback
    if(err) {
      return callback(err);
    }

    //Create an array for the filenames to return
    var toReturn = [];

    //For each file in the directory check if it has desired extension
    dir.forEach(function(file) {
      //If the file does have the desired extension, add it to the array to be
      //returned
      if((path.extname(file)) === "." + extension)
        toReturn.push(file);
    });

    //Return the callback with null for error and the array containing the
    //filtered files
    return callback(null, toReturn);
  });
}


//Export the function
module.exports = mymodule;
