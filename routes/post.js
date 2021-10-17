const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middlewares/is-auth');
const validator = require('../middlewares/post.validator');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');
const router = express.Router();

//get All posts
router.get('/', isAuth, postController.getAllPosts);

// create new post
router.post(
  '/post',
  isAuth,
  validator.postContentValidator,
  postController.createPost
);

// get post by id
router.get('/post/:postId', isAuth, postController.getPost);

// update post
router.put('/post/:postId', isAuth, postController.updatePost);

// delete post
router.delete('/post/:postId', isAuth, postController.deletePost);

// set like post
router.post('/post/:postId/like', isAuth, postController.setPostLike);

// remove like
router.delete('/post/:postId/like', isAuth, postController.removePostLike);

// comments section

// create new comment
router.post(
  '/post/:postId/comment',
  isAuth,
  validator.postContentValidator,
  commentController.createComment
);

// get post comments
router.get(
  '/post/:postId/comment',
  isAuth,
  commentController.getAllCommentsForPost
);

// delete post comment
router.delete(
  '/post/:postId/comment/:commentId',
  isAuth,
  commentController.deleteComment
);

// update post comment
router.put(
  '/post/:postId/comment/:commentId',
  isAuth,
  validator.postContentValidator,
  commentController.updateComment
);

// set like comment
router.post(
  '/post/:postId/comment/:commentId/like',
  isAuth,
  commentController.setCommentLike
);

// remove like
router.delete(
  '/post/:postId/comment/:commentId/like',
  isAuth,
  commentController.deleteCommentLike
);

module.exports = router;
