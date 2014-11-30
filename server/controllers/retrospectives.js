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
  Retrospective.find({}).sort({
    active: -1,
    createdAt: -1
  }).exec(function (err, retrospectives) {
    if (err) throw new Error(err);

    res.json(retrospectives);
  })
};

exports.create = function (req, res) {
  Retrospective.create(req.body, function (err, createdRetrospective) {
    if (err) throw new Error(err);

    res.json(createdRetrospective);
  })
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