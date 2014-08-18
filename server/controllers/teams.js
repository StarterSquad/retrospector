var mongoose = require('mongoose'),
  Team = mongoose.model('Team'),
  _ = require('underscore');

exports.create = function (req, res) {
  Team.create(req.body, function (err, createdTeam) {
    if (err) throw new Error(err);

    res.json(createdTeam);
  })
};

exports.getList = function (req, res) {
  var teamMember = req.query.member;

  if (!teamMember) {
    var error = new Error('Pass member query field to get all your teams');
    error.statusCode = 400;

    return res.json(error);
  }

  Team.find({ members: { $in: [teamMember] } }, function (err, teams) {
    if (err) throw new Error(err);

    res.json(teams);
  })
};