define(['./module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('RetrospectivesViewCtrl', function ($scope, UserManager, socket, retrospective, fullscreen) {
    $scope.retrospective = retrospective;
    $scope.user = UserManager.data;
    $scope.fullscreen = fullscreen;

    /**
     * Methods
     */

    $scope.addNewAnswer = function (question) {
      if (question) {
        question.answers.push({
          user: $scope.user
        })
      }
    };

    /**
     * Handlers
     */

    socket.on('retrospective:userJoined', function (user) {
      var isUserAlreadyParticipant = _($scope.retrospective.participants).some(function (participant) {
        return participant.user._id === user._id;
      });

      if (!isUserAlreadyParticipant) {
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

    // Add empty answer to current active question by default so I can edit it
    var activeQuestion = _($scope.retrospective.questions).findWhere({ status: 'active' });
    $scope.addNewAnswer(activeQuestion);
  });
});
