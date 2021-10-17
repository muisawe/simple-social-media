const { body } = require('express-validator');
const userDb = require('../db/queries/user');

const registerValidator = [
  body('email', 'Please enter  a Valid Email')
    .isEmail()

    .custom((value, { req }) => {
      return userDb.findUserByEmail(value).then(user => {
        if (user.rowCount == 1) {
          return Promise.reject('Email Already Exist');
        }
      });
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 8 }),
  body('name').trim().not().isEmpty(),
];
const loginValidator = [
  body('email', 'Please enter  a Valid Email')
    .isEmail()
    .custom((value, { req }) => {
      return userDb.findUserByEmail(value).then(user => {
        if (user.rowCount == 0) {
          return Promise.reject('Email is not Exist');
        }
      });
    })
    .normalizeEmail(),
];

module.exports = {
  registerValidator,
  loginValidator,
};
