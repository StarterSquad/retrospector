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

    $scope.likeAnswer = function (answer) {
      var alreadyLiked = answer.likes.indexOf($scope.user._id) !== -1;

      if (alreadyLiked) {
        // Dislike
        answer.likes = _(answer.likes).without($scope.user._id);
      } else {
        // Like
        answer.likes.push($scope.user._id);
      }

      socket.emit('retrospective:answer:like', {
        retrospectiveId: retrospective._id,
        answerId: answer._id
      });
    };

    $scope.finishDiscussion = function (question) {
      if (question.finishedDiscussion.indexOf($scope.user._id) !== -1) {
        return;
      }

      if ($scope.retrospective.leader === $scope.user._id) {
        switchToNextQuestion();
      } else {
        question.finishedDiscussion.push($scope.user._id);
      }

      socket.emit('retrospective:finishDiscussion', {
        retrospectiveId: retrospective._id,
        questionId: question._id
      });
    };

    $scope.populateUser = function (id) {
      return _($scope.retrospective.participants)
        .chain()
        .pluck('user')
        .findWhere({ _id: id })
        .value();
    };

    /**
     * Helpers
     */

    function switchToNextQuestion() {
      var activeQuestion = _($scope.retrospective.questions).find({ status: 'active' });
      var nextWaitingQuestion = _($scope.retrospective.questions).find({ status: 'waiting' });

      if (nextWaitingQuestion) {
        activeQuestion.status = 'finished';
        nextWaitingQuestion.status = 'active';
      }
    }

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

    socket.on('retrospective:answer:liked', function (data) {
      var question = _($scope.retrospective.questions).find(function (quesrion) {
        return _(quesrion.answers).findWhere({ _id: data.likedAnswer._id });
      });
      var answer = _(question.answers).findWhere({ _id: data.likedAnswer._id });
      answer.likes = data.likedAnswer.likes;
    });

    socket.on('retrospective:discussionFinished', function (data) {
      if (data.doSwitchToNextDiscussion) {
        switchToNextQuestion();
      } else {
        _($scope.retrospective.questions).findWhere({ _id: data.questionId }).finishedDiscussion.push(data.user);
      }
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
