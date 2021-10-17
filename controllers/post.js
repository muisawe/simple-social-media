const postDb = require('../db/queries/post');
const commentDb = require('../db/queries/comment');

const validatorError = 'validation error';
const { validationResult } = require('express-validator');

const createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(validatorError);
    error.statusCode = 422;
    throw error;
  }

  const userId = req.userId;
  const content = req.body.content;
  postDb
    .createPost(userId, content)
    .then(result => {
      res.status(201).json({
        post: result.rows,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

const getAllPosts = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(validatorError);
    error.statusCode = 422;
    throw error;
  }

  postDb
    .getAllPosts()
    .then(result => {
      res.status(200).json({
        posts: result.rows,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

const getPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(validatorError);
    error.statusCode = 422;
    throw error;
  }
  const postId = req.body.postId;
  postDb
    .getPostById(postId)
    .then(result => {
      res.status(200).json({
        posts: result.rows,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
const deletePost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(validatorError);
    error.statusCode = 422;
    throw error;
  }
  const postId = req.body.postId;
  let deletedPost;
  postDb
    .deletePost(postId)
    .then(result => {
      deletedPost = result.rows;
      return commentDb.deletePostComment(postId);
    })
    .then(result => {
      res.status(200).json({
        post: deletedPost,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
const updatePost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(validatorError);
    error.statusCode = 422;
    throw error;
  }
  const postId = req.body.postId;
  const content = req.body.content;
  postDb
    .updatePostContent(postId, content)
    .then(result => {
      res.status(204).json({
        post: result.rows,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

const setPostLike = (req, res, next) => {
  if (!errors.isEmpty()) {
    const error = new Error(validatorError);
    error.statusCode = 422;
    throw error;
  }
  const postId = req.body.postId;
  const userId = req.userId;
  postDb.isPostLikeExsist
    .then(result => {
      if (result.rows.count > 0) {
        res.status(403).json({ message: 'forbidden' });
      } else {
        postDb.addNewPostLike(userId, postId).then(result => {
          res.status(201).json({ message: 'like added' });
        });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

const removePostLike = (req, res, next) => {
  if (!errors.isEmpty()) {
    const error = new Error(validatorError);
    error.statusCode = 422;
    throw error;
  }
  const postId = req.body.postId;
  const userId = req.userId;
  postDb.isPostLikeExsist
    .then(result => {
      if (result.rows.count > 0) {
        res.status(403).json({ message: 'forbidden' });
      } else {
        postDb.removePostLike.then(result => {
          res.status(204).json({ message: 'like removed' });
        });
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getPost,
  setPostLike,
  removePostLike,
};
