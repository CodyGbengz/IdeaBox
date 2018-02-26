import express from 'express';
import auth from '../utils/auth';
import Idea from '../controllers/ideaController';
import { createIdeaValidator } from '../utils/validator';


const router = express.Router();

// create idea route
router.post('/api/v1/idea', auth, createIdeaValidator, Idea.createIdea);

// edit idea route, set as public or private
router.put('/api/v1/idea/:id', auth, Idea.updateIdea);

// get all public ideas, search idea, get by category
router.get('/api/v1/ideas', Idea.fetchPublicIdeas, Idea.fetchByCategory, Idea.searchIdeas);

// fetch single idea
router.get('/api/v1/idea/:id', Idea.fetchSingleIdea);

// fetch user ideas
router.get('/api/v1/ideas/user', auth, Idea.fetchUserIdeas);

// delete idea
router.delete('/api/v1/idea/:id', auth, Idea.deleteSingleIdea);


export default router;
