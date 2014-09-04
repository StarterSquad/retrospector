var _ = require('underscore');
var retrospectives = require('../controllers/retrospectives');

function disconnectUser(sessionId) {
  // TODO stop last resetIdle() execution

  delete global.sockets[sessionId];
}

module.exports = function (io) {
  io.sockets.on('connection', function (socket) {
    var sessionId;

    /**
     * Idle
     */
    var makeParticipantIdle = _.debounce(function (retrospectiveId, userId) {
      retrospectives.setParticipantIdle(retrospectiveId, userId, true, function (err) {
        if (err) throw new Error(err);

        io.sockets.to(retrospectiveId).emit('retrospective:userIdle', {
          userId: userId,
          isIdle: true
        });
      });
    }, global.ENV_CONFIG.idleTimer);

    var resetIdle = function (retrospectiveId) {
      retrospectives.setParticipantIdle(retrospectiveId, sessionId, false, function (err) {
        if (err) throw new Error(err);

        io.sockets.to(retrospectiveId).emit('retrospective:userIdle', {
          userId: sessionId,
          isIdle: false
        });
      });

      makeParticipantIdle(retrospectiveId, sessionId);
    };

    socket.on('user:login', function (userId) {
      sessionId = userId;
      global.sockets[sessionId] = socket;
    });

    socket.on('user:joinToRetrospective', function (data) {
      socket.join(data.retrospectiveId);

      retrospectives.addParticipant(data.retrospectiveId, data.user._id, function (err) {
        if (err) throw new Error(err);

        io.sockets.to(data.retrospectiveId).emit('retrospective:userJoined', data.user);
        resetIdle(data.retrospectiveId);
      });
    });

//    socket.on('user:resetIdle', resetIdle);

    socket.on('disconnect', function () {
      disconnectUser(sessionId);
    });

    socket.on('user:logout', function () {
      disconnectUser(sessionId);
    });
  });
};

