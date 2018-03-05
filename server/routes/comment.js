import express from 'express';
import auth from '../utils/auth';
import Comment from '../controllers/commentController';
import { commentValidator } from '../utils/validator';

const router = express.Router();

// post comment
router.post(
  '/api/v1/idea/:id/comment',
  auth,
  commentValidator,
  Comment.postComment
);

// get comments
router.get(
  '/api/v1/idea/:id/comments',
  // commentValidator,
  Comment.fetchComments
);

export default router;
