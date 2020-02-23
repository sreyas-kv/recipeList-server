const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');
const userController = require('./users');


// Sign up new user by username and password
function signUp(name, email, password) {
  if (!name || !email || !password) {
    return Promise.reject({
      success: false,
      message: 'Please, provide email and password!',
    });
  }

  return User.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        return Promise.reject({
          success: false,
          message: 'email is already taken',
        });
      }

      const newUser = new User({ name, email, password });

      return newUser.save();
    })
    .then((savedUser) => userController.getUserById(savedUser._id))
    .then(({ user }) => {
      const token = jwt.sign(
        { userId: user._id },
        config.secret,
        { expiresIn: 60 * 60 * 24 * 10 } // 10 days
      );

      return Promise.resolve({
        success: true,
        message: 'User has been created',
        token,
        user,
      });
    });
}

// Login user by username and password
function login(email, password) {
  if (!email || !password) {
    return Promise.reject({
      success: false,
      message: 'Please, provide email and password!',
    });
  }

  return User.findOne({ email })
    .exec()
    .then((email) => {
      if (!email) {
        return Promise.reject({
          message: 'Sorry, no account found with the email',
          notExists: true,
        });
      }

      return Promise.all([
        Promise.resolve(email),
        email.comparePassword(password),
      ]);
    })
    .then(([user, isPasswordMatch]) => {
      
      if (!isPasswordMatch) {
        return Promise.reject({
          success: false,
          message: 'The username or password you entered is incorrect.',
        });
      }
      return user;
    })
    // .then((savedUser) => userController.getUserById(savedUser._id))
    .then((user) => {
      const token = jwt.sign(
        { userlId: user._id },
        config.secret,
        { expiresIn: 60 * 60 * 24 * 10 } // 10 days
        );

      return Promise.resolve({
        success: true,
        message: 'Success! You are logged in.',
        token,
        user,
      });
    });
}

// Logout username
// You should remove JWT from localStorage
function logout() {
  return Promise.resolve({
    success: true,
    message: 'You are now logged out',
  });
}

module.exports = {
  signUp,
  login,
  logout,
};
