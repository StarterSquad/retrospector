var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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
  guests: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
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