import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../models/user';


mongoose.Promise = global.Promise;

export default {
  /**
   * @description createUser controller handles request for creating new users
   *
   * @param {Object}  req user request Object
   * @param {Object}  res server response Object
   *
   * @returns {Object} - res
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
              const token = jwt.sign(
                {
                  id: newUser.id,
                  username: newUser.username
                },
                process.env.SECRET,
                { expiresIn: 86400 }
              );
              return res.status(201).json({
                status: 'Success',
                message: 'User created successfully',
                user: {
                  id: newUser.id,
                  username: newUser.username
                },
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
   * @description loginUser controller logs in a registered user
   *
   * @param {Object} req - user request Object
   * @param {Object} res - server response Object
   *
   * @returns {Object} - response
   */
  loginUser(req, res) {
    const { username, password } = req.body;
    User.findOne({ username })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            status: 'Fail',
            message: 'Invalid Username'
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({
            status: 'Fail',
            message: 'Wrong Password'
          });
        }
        if (user) {
          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
            },
            process.env.SECRET,
            { expiresIn: 86400 }
          );
          return res.status(200).json({
            status: 'Success',
            message: 'Login successful',
            user: {
              username: user.username,
              id: user.id
            },
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
   * @description editUserProfile modifies a users profile
   *
   * @param {Object} req - user request Object
   * @param {Object} res - server response Object
   *
   * @returns {Object}  response
   */
  editUserProfile(req, res) {
    const userInfo = {
      $set: req.body
    };
    User.findByIdAndUpdate(req.decoded.id, userInfo, { new: true })
      .then((updatedUser) => {
        res.status(200).json({
          status: 'Success',
          message: 'Details successfully updated',
          updatedUser: {
            username: updatedUser.username,
            createdAt: updatedUser.createdAt,
            email: updatedUser.email
          }
        });
      })
      .catch((error) => {
        if (error.code === 11000) {
          return res.status(409).json({
            status: 'Fail',
            message: 'This username is taken'
          });
        }
        return res.status(500).json({
          status: 'Fail',
          error: error.message
        });
      });
  },
  /**
   * @description fetchUserProfile gets a user's profile
   *
   * @param {Object} req - user request Object
   * @param {Object} res - server response Object
   *
   * @returns {Object} res
   */
  fetchUserProfile(req, res) {
    User.findById(req.decoded.id)
      .then((user) => {
        if (user) {
          return res.status(200).json({
            status: 'Success',
            message: 'Profile fetched successfully',
            user: {
              username: user.username,
              createdAt: user.createdAt,
              email: user.email
            }
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
