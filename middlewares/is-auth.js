const e = require('express');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (!authorization) {
    const error = new Error('Not Authorized');
    error.statusCode = 401;
    throw error;
  }
  const token = authorization.split(' ')[1];

  try {
    jwt.verify(token, 'someSuperSecretkey', (err, decoded) => {
      if (err) {
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        throw error;
      }
      req.userId = decodedToken.userId;
      next();
    });
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};
