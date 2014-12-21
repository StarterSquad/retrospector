var mongoose = require('mongoose');
var Team = mongoose.model('Team');
var _ = require('underscore');

exports.create = function (req, res) {
  Team.create(req.body, function (err, createdTeam) {
    if (err) throw new Error(err);

    res.json(createdTeam);
  })
};

exports.update = function (req, res) {
  Team.findByIdAndUpdate(req.params.id, _(req.body).omit('_id'), function (err, updatedTeam) {
    if (err) throw new Error(err);

    updatedTeam.populate('members', function (err, populatedTeam) {
      if (err) throw new Error(err);

      res.json(populatedTeam);
    });
  });
};

exports.getList = function (req, res) {
  var teamMember = req.query.member;

  if (!teamMember) {
    var error = new Error('Pass member query field to get all your teams');
    error.statusCode = 400;

    return res.json(error);
  }

  Team.find({ members: { $in: [teamMember] } }).populate('members').exec(function (err, teams) {
    if (err) throw new Error(err);

    res.json(teams);
  })
};