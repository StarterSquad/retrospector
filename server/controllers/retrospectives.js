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

    var question = _(retrospective.questions).find(function (question) {
      return question._id.equals(questionId);
    });

    question.answers.push({
      user: userId,
      text: answerText
    });

    retrospective.save(function (err, updatedRetrospective) {
      var question = _(updatedRetrospective.questions).find(function (question) {
        return question._id.equals(questionId);
      });
      var addedAnswer = question.answers[question.answers.length - 1];

      done(err, addedAnswer)
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
    var existingParticipant = _(retrospective.participants).find(function (participant) {
      return participant.user.equals(userId);
    });

    if (existingParticipant) {
      existingParticipant.isIdle = isIdle;

      return retrospective.save(done);
    }

    if (done) {
      done(null);
    }
  })
};