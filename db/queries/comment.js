const db = require('../config/connection');

const addNewComment = (userId, postId, content) => {
  return db.query(
    'INSERT INTO comments (post_id,user_id,content,created_at) VALUES ($1, $2,$3,$4) returning *',
    [postId, userId, content, new Date()]
  );
};
const deleteComment = (commentId, userId) => {
  return db.query('delete from comments where id=$1 and user_id=$2', [
    commentId,
    userId,
  ]);
};
const deleteUserComments = userId => {
  return db.query('delete from comments where user_id=$1', [userId]);
};
const updateComment = (commentId, userId, content) => {
  return db.query(
    'update  comments set content=$3 where id=$1 and user_id=$2',
    [commentId, userId, content]
  );
};

const addNewCommentLike = (userId, commentId) => {
  return db.query(
    'INSERT INTO comment_likes (user_id,comment_id) VALUES ($1, $2) returning *',
    [userId, commentId]
  );
};

const removeCommentLike = (userId, commentId) => {
  return db.query(
    'DELETE FROM comment_likes  WHERE user_id=$1 and comment_id=$2 returning *',
    [userId, commentId]
  );
};

const deletePostComment = postId => {
  return db.query('DELETE FROM comments WHERE post_id=$1 returning *', [
    postId,
  ]);
};

const isCommentLikeExsist = (userId, commentId) => {
  return db.query(
    'select * from  comment_likes  where user_id=$1 and comment_id=$2 ',
    [userId, commentId]
  );
};
// convert this sql command to join
const getCommentLikes = commentId => {
  return db.query(
    'select name from users where  id  in (select user_id from comment_likes where comment_id=$1) ',
    [commentId]
  );
};

const getAllCommentForPost = postId => {
  return db.query('select * from comments where  post_id=$1 ', [postId]);
};

module.exports = {
  addNewComment,
  deleteComment,
  addNewCommentLike,
  removeCommentLike,
  getCommentLikes,
  getAllCommentForPost,
  isCommentLikeExsist,
  updateComment,
  deleteUserComments,
  deletePostComment,
};
