//Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = require('./comments.js');

// Create server
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  // Request for comments
  if (pathname === '/getComments') {
    var comments = comments.get();
    // Set response header
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:63342'
    });
    // Return comments
    res.end(JSON.stringify(comments));
  } else if (pathname === '/saveComment') {
    // Get comment from request
    var comment = '';
    req.on('data', function (chunk) {
      comment += chunk;
    });
    req.on('end', function () {
      comments.add(JSON.parse(comment));
      res.end();
    });
  } else {
    // Read static file
    fs.readFile(path.join(__dirname, pathname), function (err, data) {
      if (err) {
        res.writeHead(404, 'Not Found');
        res.end('404 Not Found');
      } else {
        res.end(data);
      }
    });
  }
}).listen(8080, function () {
  console.log('Server at http://localhost:8080');
});




