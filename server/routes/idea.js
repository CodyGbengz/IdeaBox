import express from 'express';
import auth from '../utils/auth';
import Idea from '../controllers/ideaController';
import { createIdeaValidator } from '../utils/validator';


const router = express.Router();

// create idea route
router.post('/api/v1/idea', auth, createIdeaValidator, Idea.createIdea);

// edit idea route, set as public or private
router.put('/api/v1/idea/:id', (req, res) => {
  res.status(200).send('edit idea');
});

// get all public ideas, search idea, get by category
router.get('/api/v1/ideas', Idea.fetchPublicIdeas, Idea.fetchByCategory);

// fetch single idea
router.get('/api/v1/idea/:id', Idea.fetchSingleIdea);

// fetch user ideas
router.get('/api/v1/ideas/user', auth, Idea.fetchUserIdeas);

// delete idea
router.delete('/api/v1/idea/:id', auth, Idea.deleteSingleIdea);

// post comment
router.post('/api/v1/idea/:id/comment', (req, res) => {
  res.status(201).send('comment posted');
});

// get comments
router.get('/api/v1/idea/:id/comments', (req, res) => {
  res.status(200).send('fetch idea comments');
});

export default router;
