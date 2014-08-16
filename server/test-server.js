var mongoose = require('mongoose'),
  clc = require('cli-color');

global.ENV_CONFIG = require('./test-environment-config.json');

var errorMessage = clc.red.bold;
var noticeMessage = clc.blue;
var warnMessage = clc.yellow;

// Connect to Mongo
mongoose.connect(global.ENV_CONFIG.db, function (error) {
  if (error) {
    console.log(errorMessage('Error! Failed to connect to mongo at "' + global.ENV_CONFIG.db + '"'));
    console.log(error);
    process.exit();
  } else {
    console.log(noticeMessage('Connected to ' + global.ENV_CONFIG.db));
  }
});

before(function (done) {
  mongoose.connection.on('open', function () {
    mongoose.connection.db.dropDatabase(function () {
      console.log(noticeMessage('Wiped database.'));
      done();
    });
  });
});

after(function (done) {
  mongoose.connection.close(function () {
    console.log(noticeMessage('Closed mongo connection.'));
    done();
  });
});
