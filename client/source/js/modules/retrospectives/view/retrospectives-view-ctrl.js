define(['./module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('RetrospectivesViewCtrl', function ($scope, UserManager, socket, retrospective, fullscreen) {
    $scope.retrospective = retrospective;

    /**
     * Handlers
     */

    socket.on('retrospective:userJoined', function (user) {
      var isUserAlredyParticipant = _($scope.retrospective.participants).some(function (participant) {
        return participant.user._id === user._id;
      });

      if (!isUserAlredyParticipant) {
        $scope.retrospective.participants.push({
          user: user
        });
      }
    });

    socket.on('retrospective:userIdle', function (data) {
      var user = _($scope.retrospective.participants).find(function (participant) {
        return participant.user._id === data.userId;
      });

      if (user) {
        user.isIdle = data.isIdle;
      }
    });

    /**
     * Init
     */

    socket.emit('user:joinToRetrospective', {
      retrospectiveId: retrospective._id,
      user: UserManager.data
    });

    $scope.fullscreen = fullscreen;
  });
});
