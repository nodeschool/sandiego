var http = require('http'),
    url  = require('url');

// Create a server and pass in a function to handle requests.
var server = http.createServer(function(req, res) {
  // Write an HTTP header that specified the response will be JSON.
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  // Parse the URL into usable data.
  var urlData = url.parse(req.url, true);

  // Get the pathname of the URL.
  var pathname = urlData.pathname;

  // Get the `iso` field of the URL query.
  var iso = urlData.query.iso;

  // Convert the `iso` value into a Date object.
  var date = new Date(iso);

  if (pathname === '/api/parsetime') {
    // Create an object of data to return.
    var returnData = {
      'hour': date.getHours(),
      'minute': date.getMinutes(),
      'second': date.getSeconds()
    };

    // Convert the object to a JSON string and write it to the response.
    res.write(JSON.stringify(returnData));
  } else if (pathname === '/api/unixtime') {
    // Create an object of data to return.
    var returnData = {
      'unixtime': date.getTime()
    };

    // Convert the object to a JSON string and write it to the response.
    res.write(JSON.stringify(returnData));
  }

  // Close the response and send it.
  res.end();
});

// Listen for connections on the port input in the first command-line arg.
server.listen(process.argv[2]);