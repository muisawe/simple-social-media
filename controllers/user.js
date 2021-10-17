const user = require('../db/queries/user');
const comment = require('../db/queries/comment');
const post = require('../db/queries/post');

const login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errro = new Error('Validation result error');
    errro.statusCode = 422;
    errro.data = errors.array();

    throw errro;
  }
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  user
    .findUserByEmail(email)
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email couldent be found');
        error.statusCode = 401; // not authenticated
        throw error;
      }
      loadedUser = user[0];
      return bcrypt.compare(password, loadedUser.password);
    })
    .then(isEqeual => {
      if (!isEqeual) {
        const error = new Error('password is incorrect');
        error.statusCode = 401; // not authenticated
        throw error;
      }
      loadedUser.password = undefined;
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser.id },
        'someSuperSecretkey',
        { expiresIn: '1d' }
      );
      res.status(200).json({ token: token, data: loadedUser });
    })
    .catch(err => {
      console.log('err', err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const register = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errro = new Error('Validation result error');
    errro.statusCode = 422;
    errro.data = errors.array();

    throw errro;
  }

  const email = req.body.email;
  const imageUrl = req.body.imageUrl;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(result => {
      user.createUser(name, email, result, imageUrl).then(result => {
        result.password = undefined;
        res.status(201).json({ data: result });
      });
    })
    .catch(err => {
      console.log('err', err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const deleteUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errro = new Error('Validation result error');
    errro.statusCode = 422;
    errro.data = errors.array();

    throw errro;
  }
  const userId = req.userId;
  user
    .deleteUser(userId)
    .then(result => {
      return post.deleteUserPosts(userId);
    })
    .then(result => {
      return comment.deleteUserComments(userId);
    })
    .then(result => {
      res.status(201).json({ message: 'user deleted' });
    })
    .catch(err => {
      console.log('err', err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

module.exports = {
  login,
  register,
  deleteUser,
};
