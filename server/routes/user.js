import express from 'express';

const router = express.Router();

// create user route
router.post('/api/v1/user/signup', (req, res) => {
  res.status(201).send('signup user');
});

// login user route
router.post('/api/v1/user/signin', (req, res) => {
  res.status(200).send('signin user');
});

// edit user profile route
router.put('/api/v1/user/', (req, res) => {
  res.status(200).send('edit users profile');
});

// get user profile route
router.get('/api/v1/user/', (req, res) => {
  res.status(200).send('get users details');
});

export default router;
