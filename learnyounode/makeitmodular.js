/**
 * Filename: makeitmodular.js
 * Author: Joel Sequeira
 * Description: This file requires a local module called "mymodule" and
 *              passes in 3 arguments to it (directory name, file extension and
 *              a callback function) to output all the files in the directory
 *              with the desired file extension.
 */

//Require the local module called mymodule
var mymodule = require('./mymodule.js');

//Call the mymodule function with params directory name, extension, and callback
mymodule(process.argv[2], process.argv[3], function(err, data) {
  //if error was found, throw it
  if(err) {
    throw err;
  }

  //For each data object (file name with extension) print it to output
  data.forEach(function(file) {
    console.log(file);
  });
});
