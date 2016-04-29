/**
 * Filename: jugglingasync.js
 * Author: Joel Sequeira
 * Description: Performs an HTTP GET request to multiple URLs provided as
 *              command-line argument and writes all the data collected from
 *              each URL to the output in the order they were entered in the
 *              input.
 */

//Require the built-in modules
var http = require('http'),
    bl   = require('bl');

//Variables to keep track of number of callbacks
var total   = process.argv.length - 2,
    count   = 0,
    strings = []; //array to hold strings returned

/**
 * Function name: getData
 * Description: This function takes an index for the url, gets the data from
 *              that url and then stores it in the strings array. Once all
 *              the asynchronous calls are finished it calls printAll().
 * Input: Index of the url (starting from 0 for argv[2]).
 * Output: None.
 * Return: None.
 */
function getData(index) {
  //Perform an HTTP GET request on the url
  http.get(process.argv[2+index], function(res){
    //Set the encoding to utf-8
    res.setEncoding('utf-8');

    //Pipe the response to get all the data
    res.pipe(bl(function(err, data){
      //If there was an error output it and exit
      if(err) {
        console.log(err);
        process.exit(1);
      }

      //Add the data to its respective index in the strings array
      strings[index] = data.toString();
      //Increment count
      count++

      //If the data from all the urls has been collected then call printAll
      if(count === total)
        printAll();
    }));
  });
}


/**
 * Function name: printAll
 * Description: This function prints all the strings from the strings array (the
 *              data from all the urls).
 * Input: None.
 * Output: The data from each url on one line.
 * Return: None.
 */
function printAll() {
  strings.forEach(function(string){
    console.log(string);
  });
}

//Loop through the indices for the urls to asynchronously call getData
for(var i = 0; i < total; i++) {
  getData(i);
}
