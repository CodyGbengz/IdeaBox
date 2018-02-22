import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema({
  stars: {
    type: Number,
    default: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea'
  }
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
