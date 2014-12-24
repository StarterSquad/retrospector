var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = require('./comment');

var RetrospectiveSchema = new Schema({
  name: {
    type: String,
    trim: true
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
  questions: [{
    text: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    status: {
      type: String,
      enum: ['active', 'waiting', 'finished'],
      default: 'waiting'
    },
    answers: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true,
        trim: true
      },
      likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      comments: [CommentSchema],
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
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