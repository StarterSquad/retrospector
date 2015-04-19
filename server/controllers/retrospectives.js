var mongoose = require('mongoose'),
  Retrospective = mongoose.model('Retrospective'),
  _ = require('underscore');

exports.get = function (req, res) {
  Retrospective.findById(req.params.id).populate('participants.user').exec(function (err, retrospective) {
    if (err) throw new Error(err);

    res.json(retrospective);
  })
};

exports.getList = function (req, res) {
  Retrospective
    .find()
    .populate('team')
    .populate('participants.user')
    .sort({
      active: -1,
      createdAt: -1
    })
    .exec(function (err, retrospectives) {
      if (err) throw new Error(err);

      res.json(retrospectives);
    })
};

exports.create = function (req, res) {
  var retrospective = req.body;

  if (!retrospective.questions.length) {
    return res.json(400, {
      message: 'No questions to discuss'
    });
  }

  retrospective.questions[0].status = 'active';

  Retrospective.create(retrospective, function (err, createdRetrospective) {
    if (err) throw new Error(err);

    res.json(createdRetrospective);
  })
};

exports.addAnswer = function (retrospectiveId, questionId, answerText, userId, done) {
  Retrospective.findById(retrospectiveId, function (err, retrospective) {
    if (err) throw new Error(err);

    var question = _(retrospective.questions).findById(questionId);

    question.answers.push({
      user: userId,
      text: answerText
    });

    retrospective.save(function (err, updatedRetrospective) {
      if (err) throw new Error(err);

      var question = _(updatedRetrospective.questions).findById(questionId);
      var addedAnswer = question.answers[question.answers.length - 1];

      done(err, addedAnswer)
    });
  });
};

exports.likeAnswer = function (retrospectiveId, answerId, userId, done) {
  Retrospective.findById(retrospectiveId, function (err, retrospective) {
    if (err) throw new Error(err);

    var question = _(retrospective.questions).find(function (quesrion) {
      return _(quesrion.answers).findById(answerId);
    });
    var answer = _(question.answers).findById(answerId);
    var existingLikeIndex = answer.likes.indexOf(userId);

    // Is already liked
    if (existingLikeIndex !== -1) {
      // Dislike
      answer.likes.splice(existingLikeIndex, 1);
    } else {
      // Like
      answer.likes.push(userId);
    }

    retrospective.save(function (err) {
      if (err) throw new Error(err);
      
      done(err, answer)
    });
  });
};

exports.addParticipant = function (retrospectiveId, userId, done) {
  Retrospective.findById(retrospectiveId, function (err, retrospective) {
    if (err) throw new Error(err);

    // Is user already a participant of this retrospective
    var existingParticipant = _(retrospective.participants).some(function (participant) {
      return participant.user.equals(userId);
    });

    if (!existingParticipant) {
      retrospective.participants.push({
        user: userId
      });

      return retrospective.save(done);
    }

    if (done) {
      done(null);
    }
  })
};

exports.setParticipantIdle = function (retrospectiveId, userId, isIdle, done) {
  Retrospective.findById(retrospectiveId, function (err, retrospective) {
    if (err) throw new Error(err);

    // Is user already a participant of this retrospective
    var existingParticipant = _(retrospective.participants).findById(userId);

    if (existingParticipant) {
      existingParticipant.isIdle = isIdle;

      return retrospective.save(done);
    }

    if (done) {
      done(null);
    }
  })
};

exports.finishDiscussion = function (retrospectiveId, questionId, userId, done) {
  Retrospective.findById(retrospectiveId, function (err, retrospective) {
    if (err) throw new Error(err);

    var question = _(retrospective.questions).findById(questionId);
    var nextWaitingQuestion = _(retrospective.questions).find({ status: 'waiting' });

    // Mark user is done (once)
    if (question.finishedDiscussion.indexOf(userId) === -1) {
      question.finishedDiscussion.push(userId);
    }

    // If user is leader
    if (retrospective.leader.equals(userId)) {
      // Finish discussion of the question
      question.status = 'finished';
      // Start new discussion
      if (nextWaitingQuestion) {
        nextWaitingQuestion.status = 'active';
      }
    }

    retrospective.save(done);
  })
};