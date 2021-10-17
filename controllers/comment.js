const commentDb = require('../db/queries/comment');
const { validationResult } = require('express-validator');

const createComment = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('validation error');
    error.statusCode = 422;
    throw error;
  }

  const userId = req.userId;
  const postId = req.body.postId;
  const content = req.body.content;

  commentDb
    .addnewComment(userId, postId, content)
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

const getAllCommentsForPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('validation error');
    error.statusCode = 422;
    throw error;
  }
  const postId = req.body.postId;

  commentDb
    .getAllCommentForPost(postId)
    .then(result => {
      res.status(200).json({
        comments: result.rows,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

const deleteComment = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('validation error');
    error.statusCode = 422;
    throw error;
  }
  const commentId = req.body.commentId;
  const userId = req.userId;
  commentDb
    .deleteComment(commentId, userId)
    .then(result => {
      res.status(200).json({
        comment: result.rows,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
const updateComment = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('validation error');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const userId = req.userId;
  const commentId = req.body.commentId;
  const content = req.body.content;

  commentDb
    .updateComment(commentId, userId, content)
    .then(result => {
      res.status(204).json({
        comment: result.rows,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

const setCommentLike = (req, res, next) => {
  if (!errors.isEmpty()) {
    const error = new Error('validation error');
    error.statusCode = 422;
    throw error;
  }
  const commentId = req.body.commentId;
  const userId = req.userId;

  commentDb
    .isCommentLikeExsist(userId, commentId)
    .then(result => {
      if (result.rows.count > 0) {
        res.status(403).json({ message: 'forbidden' });
      } else {
        commentDb.addNewCommentLike(userId, commentId).then(function () {
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

const deleteCommentLike = (req, res, next) => {
  if (!errors.isEmpty()) {
    const error = new Error('validation error');
    error.statusCode = 422;
    throw error;
  }
  const commentId = req.body.commentId;
  const userId = req.userId;

  commentDb
    .isCommentLikeExsist(userId, commentId)
    .then(result => {
      if (result.rows.count > 0) {
        res.status(403).json({ message: 'forbidden' });
      } else {
        commentDb.removeCommentLike.then(result => {
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
  createComment,
  getAllCommentsForPost,
  deleteComment,
  setCommentLike,
  deleteCommentLike,
  updateComment,
};
