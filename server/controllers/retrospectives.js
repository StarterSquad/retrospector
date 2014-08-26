var mongoose = require('mongoose'),
  Retrospective = mongoose.model('Retrospective'),
  _ = require('underscore');

exports.get = function (req, res) {
  Retrospective.findById(req.params.id, function (err, retrospective) {
    if (err) throw new Error(err);

    res.json(retrospective);
  })
};

exports.getList = function (req, res) {
  Retrospective.find({}, function (err, retrospectives) {
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