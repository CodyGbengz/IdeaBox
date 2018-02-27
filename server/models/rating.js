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
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  author: {
    username: String
  },
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea'
  }
});

const Rating = mongoose.model('Rating', ratingSchema);
export default Rating;
