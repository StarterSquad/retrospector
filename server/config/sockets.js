function disconnectUser(sessionId) {
  delete global.sockets[sessionId];
}

module.exports = function (io) {
  io.sockets.on('connection', function (socket) {
    var sessionId;

    socket.on('user:connect', function (userId) {
      sessionId = userId;
      global.sockets[sessionId] = socket;
    });

    socket.on('disconnect', function () {
      disconnectUser(sessionId);
    });

    socket.on('user:disconnect', function () {
      disconnectUser(sessionId);
    });
  });
};

