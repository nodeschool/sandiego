/**
 * Filename: babysteps.js
 * Author: Joel Sequeira
 * Description: Takes in numbers as command line arguments and prints out
 *              their sum.
 */

var sum = 0;
var num;

//Loop through all the command line args starting from 2 (because arg[0] is
//"node" and arg[1] is the program name).
for(var i = 2; i < process.argv.length; i++) {
  //Get the number and add it to the sum
  num = Number(process.argv[i]);
  sum+=num;
}

//Output the sum
console.log(sum);
