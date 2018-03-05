import mongoose from 'mongoose';

const ideaSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['science', 'arts', 'agriculture', 'tech', 'others'],
    required: true
  },
  dueBy: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'public'
  },
  modified: {
    type: Boolean,
    default: false
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }]
});

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;

