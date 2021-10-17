const express = require('express');
const authController = require('../controllers/user');
const userDb = require('../db/queries/user');
const { body } = require('express-validator');
const router = express.Router();
const isAuth = require('../middleware/is-auth');

router.post(
  '/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter  a Valid Email')
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
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email')
      .isEmail.withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return userDb.findUserByEmail(value).then(user => {
          if (user.rowCount == 0) {
            return Promise.reject('Email is not Exist');
          }
        });
      })
      .normalizeEmail(),
  ],
  authController.login
);

router.delete('/', isAuth, authController.deleteUser);
module.exports = router;
