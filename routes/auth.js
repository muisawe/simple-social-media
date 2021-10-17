const express = require('express');

// local modules
const authController = require('../controllers/user');
const userDb = require('../db/queries/user');

const router = express.Router();
const isAuth = require('../middlewares/is-auth');
const validator = require('../middlewares/user.validator');

router.post('/register', validator.registerValidator, authController.register);

router.post('/login', validator.loginValidator, authController.login);

router.delete('/', isAuth, authController.deleteUser);
module.exports = router;
