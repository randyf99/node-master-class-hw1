// require necessary node modules
var http = require('http');
var https = require('https');
var fs = require('fs');

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
  res.end('Hello');
};
