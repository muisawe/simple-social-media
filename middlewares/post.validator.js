const { body } = require('express-validator');

// post  content validation rules
const postContentValidator = [body('content').trim().isLength({ min: 5 })];

module.exports = {
  postContentValidator,
};
