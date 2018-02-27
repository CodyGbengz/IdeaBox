import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user';


mongoose.Promise = global.Promise;

export default {
  /**
   * creates a new user
   * @param {object}  req user request object
   * @param {object}  res server response object
   * @returns {object} - res
   */
  createUser(req, res) {
    const { username, password, email } = req.body;
    User.findOne({ email })
      .then((emailExist) => {
        if (emailExist) {
          return res.status(409).json({
            status: 'Fail',
            message: 'This user already exist'
          });
        }
        User.findOne({ username })
          .then((usernameExist) => {
            if (usernameExist) {
              return res.status(409).json({
                status: 'Fail',
                message: 'This username is already taken'
              });
            }
            const user = new User({
              username,
              password,
              email
            });
            user.save().then((newUser) => {
              const { newUserId, newUserUsername, newUserEmail } = newUser;
              const token = jwt.sign(
                { newUserId, newUserEmail, newUserUsername },
                process.env.SECRET,
                { expiresIn: 86400 }
              );
              return res.status(201).json({
                status: 'Success',
                message: 'User created successfully',
                user: newUser,
                token
              });
            })
              .catch((error) => {
                res.status(500).json({
                  status: 'Fail',
                  message: error.message
                });
              });
          });
      });
  },
  /**
   *
   * @param {object} req - user request object
   * @param {object} res - server response object
   * @returns {object} - res
   */
  loginUser(req, res) {
    const { username, password } = req.body;
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            status: 'Fail',
            message: 'Invalid credentials'
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({
            status: 'Invalid credentials'
          });
        }
        if (user) {
          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
              email: user.email
            },
            process.env.SECRET,
            { expiresIn: 86400 }
          );
          return res.status(200).json({
            status: 'Success',
            message: 'Login successful',
            token
          });
        }
      })
      .catch(error => res.status(500).json({
        status: 'Fail',
        message: error.message
      }));
  },
  /**
   *
   * @param {object} req - user request object
   * @param {object} res - server response object
   * @returns {object}  res
   */
  editUserProfile(req, res) {
    const { username, email } = req.body;
    const userInfo = {
      $set: req.body
    };
    User.findOne({ email })
      .then((emailTaken) => {
        if (emailTaken) {
          return res.status(409).json({
            status: 'Fail',
            message: 'email already taken'
          });
        }
        User.findOne({ username })
          .then((usernameTaken) => {
            if (usernameTaken) {
              return res.status(409).send({
                status: 'Fail',
                message: 'username already taken'
              });
            }
            User.findByIdAndUpdate(req.decoded.id, userInfo, { new: true })
              .then((updatedUser) => {
                res.status(200).json({
                  status: 'Success',
                  message: 'Details successfully updated',
                  updatedUser
                });
              })
              .catch(error => res.status(400).send({
                error: error.message
              }));
          });
      });
  },
  /**
   *
   * @param {object} req - user request object
   * @param {object} res - server response object
   * @returns {object} res
   */
  fetchUserProfile(req, res) {
    User.findById(req.decoded.id)
      .then((user) => {
        if (user) {
          return res.status(200).json({
            status: 'Success',
            message: 'Profile fetched successfully',
            user
          });
        }
        return res.status(404).json({
          status: 'Fail',
          message: 'User not found'
        });
      })
      .catch(error => res.status(500).json({
        status: 'Fail',
        message: error.message
      }));
  }
};
