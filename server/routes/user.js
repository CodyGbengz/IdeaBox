import express from 'express';
import User from '../controllers/user';
import { signupValidator, loginValidator } from '../utils/validator';

const router = express.Router();

// create user route
router.post('/api/v1/user/signup', signupValidator, User.createUser);

// login user route
router.post('/api/v1/user/signin', loginValidator, User.loginUser);

// edit user profile route
router.put('/api/v1/user/', (req, res) => {
  res.status(200).send('edit users profile');
});

// get user profile route
router.get('/api/v1/user/', (req, res) => {
  res.status(200).send('get users details');
});

export default router;
