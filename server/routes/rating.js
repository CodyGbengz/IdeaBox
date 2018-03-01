import express from 'express';
import auth from '../utils/auth';
import Rating from '../controllers/ratingController';
import { ratingValidator } from '../utils/validator';

const router = express.Router();

// rate idea
router.put('/api/v1/idea/:id/rate', auth, ratingValidator, Rating.rateIdea);

// get idea ratings
router.get('/api/v1/idea/:id/rate', auth, Rating.getRating);

export default router;
