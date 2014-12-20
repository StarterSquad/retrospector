var mongoose = require('mongoose');
var restify = require('restify');
var socket = require('socket.io');
var clc = require('cli-color');
var _ = require('underscore');
var fs = require('fs');
var clientSessions = require('client-sessions');

// Set sockets collector
global.sockets = {};

// Load environment config
try {
  global.ENV_CONFIG = require('./environment-config.json');
} catch (ignore) {
  global.ENV_CONFIG = require('./default-environment-config.json');
}

// Import Underscore.string to separate object, because there are conflict functions (include, reverse, contains)
_.str = require('underscore.string');

// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());

// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true

var server = restify.createServer();
var io = socket.listen(server);

var errorMessage = clc.red.bold;
var noticeMessage = clc.blue;
var warnMessage = clc.yellow;

// Connect to MongoDB
mongoose.connect(global.ENV_CONFIG.db, function (error) {
  if (error) {
    console.log(errorMessage('Error! Failed to connect to mongo at "' + global.ENV_CONFIG.db + '"'));
    console.log(error);
    process.exit();
  } else {
    console.log(noticeMessage('Connected to ' + global.ENV_CONFIG.db));
  }
});

mongoose.set('debug', true);

// Load models
fs.readdirSync('./models').forEach(function (file) {
  if (!/\.unit\.(coffee|js)$/.test(file)) {
    require('./models/' + file);
  }
});

// Load test data
if (process.argv.indexOf('--load-test-data') > -1) {
  fs.readdirSync('./testdata').forEach(function (filename) {
    var modelName = filename
      .replace('.json', '')
      .split('-')
      .map(function (part) {
        return _(part).capitalize();
      })
      .join('');

    var model = mongoose.model(modelName);
    var json = fs.readFileSync('./testdata/' + filename, { encoding: 'UTF-8' });
    var data = JSON.parse(json);

    model.remove(function () {
      model.create(data, function (err) {
        if (err) {
          console.log(errorMessage('Error while inserting test data into "' + model + '": ' + err));
        }
      });
    });
  });
}

// Configure app
server.use(restify.bodyParser({ mapParams: false })); // Mapped in req.body
server.use(restify.queryParser());
server.use(clientSessions({
  secret: 'PassportOnlineSecretKey',
  cookieName: 'token',
  requestKey: 'session_state',
  duration: 24 * 60 * 60 * 1000, // How long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // If expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

// Preset appData storage in req
server.pre(function (req, res, next) {
  req.appData = {};

  return next();
});

// Load routes
require('./config/routes')(server);

// Load sockets
require('./config/sockets')(io);

// Start server
server.listen(global.ENV_CONFIG.port);
