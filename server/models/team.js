var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  googleCalendarApiKey: {
    type: String
  }
});

mongoose.model('Team', TeamSchema);