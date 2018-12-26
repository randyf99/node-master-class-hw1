// require necessary node modules
var http = require('http');
var https = require('https');
var fs = require('fs');
var url = require('url');

// User defined modules
var config = require('./config');

// Instantiate http server
var httpServer = http.createServer(function(req, res) {
  serverResponse(req, res);
});

// Server options for https server
var httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
};

var httpsServer = https.createServer(httpsServerOptions, function(req, res) {
  serverResponse(req, res);
});

// Start the http and https servers
httpServer.listen(config.httpPort, function() {
  console.log('Listening on port ' + config.httpPort + ' we are in ' + config.envName + ' mode.');
});

httpsServer.listen(config.httpsPort, function() {
  console.log('Listening on port ' + config.httpsPort + ' we are in ' + config.envName + ' mode.');
});

var serverResponse = function(req, res) {
  // Get URL
  var parsedUrl = url.parse(req.url, true);

  // Get Path
  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Set headers

  // get hendler for the request.
  var chosenHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : handlers.notFound;

  chosenHandler(function(statusCode, payLoad) {
    statusCode = typeof statusCode == 'number' ? statusCode : 200;
    payLoad = typeof payLoad == 'object' ? payLoad : {};

    var payloadJSON = JSON.stringify(payLoad);

    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(payloadJSON);
  });
};

// handlers
var handlers = {};

handlers.hello = function(cb) {
  cb(200, { message: 'Hello everyone' });
};

handlers.notFound = function(cb) {
  cb(400);
};

// request router
var router = {
  hello: handlers.hello,
  notFound: handlers.notFound
};
