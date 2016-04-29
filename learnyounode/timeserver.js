/**
 * Filename: timeserver.js
 * Author: Joel Sequeira
 * Description: Server that listens for TCP connections on the port provided
 *              as the first argument. For each connection it will write the
 *              current date & 24 hour time in the format: "YYYY-MM-DD hh:mm"
 */

//Require the built-in net module
var net = require('net');

//Create a TCP server
var server = net.createServer(function(socket){
  //Create a date object
  var date = new Date();

  //Get the month, add 1 because it is 0 indexed
  var month = date.getMonth() + 1;
  var monthString;
  //If month is less than 10, make sure to add a leading 0 to fit the format
  if(month < 10) {
    monthString = "0" + month;
  } else {
    monthString = "" + month;
  }

  //Get the day
  var day = date.getDate();
  var dayString;
  //If day is less than 10, make sur eto add a leading 0 to fit the format
  if(day < 10) {
    dayString = "0" + day;
  } else {
    dayString = "" + day;
  }

  //Create the date string in the required format
  var dateString = date.getFullYear() + "-" + monthString + "-" +
                   dayString + " " + date.getHours() + ":" +
                   date.getMinutes() + "\n";

  //Write to the socket object then close it
  socket.end(dateString);
});

//Listen for connections on the port passed in as a command-line argument
server.listen(process.argv[2]);
