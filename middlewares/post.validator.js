const { body } = require('express-validator');

const postContentValidator = [body('content').trim().isLength({ min: 5 })];

module.exports = {
  postContentValidator,
};
