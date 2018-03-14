import express from 'express';
import User from '../controllers/userController';
import auth from '../utils/auth';
import {
  signupValidator,
  loginValidator,
  editValidator
} from '../utils/validator';

const router = express.Router();

// create user route
router.post(
  '/api/v1/users/signup',
  signupValidator,
  User.createUser
);

// login user route
router.post(
  '/api/v1/users/signin',
  loginValidator,
  User.loginUser
);

// edit user profile route
router.put(
  '/api/v1/user',
  auth,
  editValidator,
  User.editUserProfile
);

// get user profile route
router.get(
  '/api/v1/user',
  auth,
  // editValidator,
  User.fetchUserProfile
);

export default router;
