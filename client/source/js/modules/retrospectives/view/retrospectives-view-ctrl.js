define(['./module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('RetrospectivesViewCtrl', function ($scope, UserManager, socket, retrospective, fullscreen) {
    $scope.retrospective = retrospective;
    $scope.user = UserManager.data;
    $scope.fullscreen = fullscreen;

    /**
     * Methods
     */

    $scope.addAnswer = function (question, newAnswerText) {
      if (question) {
        var answer = {
          user: $scope.user._id,
          text: newAnswerText
        };

        question.answers.push(answer);

        socket.emit('retrospective:addAnswer', {
          retrospectiveId: retrospective._id,
          questionId: question._id,
          answerText: answer.text
        });
      }
    };

    $scope.populateUser = function (id) {
      return _($scope.retrospective.participants)
        .chain()
        .pluck('user')
        .findWhere({ _id: id })
        .value();
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

    socket.on('retrospective:answerAdded', function (data) {
      _($scope.retrospective.questions).findWhere({ _id: data.questionId }).answers.push(data.answer);
    });


    /**
     * Init
     */

    socket.emit('user:joinToRetrospective', {
      retrospectiveId: retrospective._id,
      user: UserManager.data
    });
  });
});
