var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RetrospectiveSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  leader: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  participants: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isIdle: Boolean
  }],
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Retrospective', RetrospectiveSchema);