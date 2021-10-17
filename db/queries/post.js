const db = require('../config/connection');

const createPost = (userId, content) => {
  return db.query(
    'INSERT INTO posts (user_id, content,created_at) VALUES ($1, $2,$3) returning *',
    [userId, content, new Date()]
  );
};
const deletePost = postId => {
  return db.query('DELETE FROM posts WHERE id=$1 returning *', [postId]);
};

const deleteUserPosts = userId => {
  return db.query('DELETE FROM posts WHERE user_id=$1 returning *', [userId]);
};

const getAllPosts = () => {
  return db.query('select * from posts');
};

const getPostById = postId => {
  return db.query('SELECT * FROM posts WHERE id=$1', [postId]);
};

const getUserPosts = userId => {
  return db.query('SELECT * FROM posts WHERE user_id=$1', [userId]);
};

const updatePostContent = (postId, newContent) => {
  return db.query('UPDATE posts SET content=$1  WHERE id=$2 returning *;', [
    newContent,
    postId,
  ]);
};

const addNewPostLike = (userId, postId) => {
  return db.query(
    'INSERT INTO post_likes (user_id,post_id) VALUES ($1, $2) returning *',
    [userId, postId]
  );
};

const isPostLikeExsist = (userId, postId) => {
  return db.query(
    'select * from  post_likes  where user_id=$1 and postId=$2 ',
    [userId, postId]
  );
};

const removePostLike = (userId, postId) => {
  return db.query(
    'DELETE FROM post_likes  WHERE user_id=$1 and post_id=$2 returning *',
    [userId, postId]
  );
};

// convert this sql command to join
const getPostLikes = postId => {
  return db.query(
    'select name from users where  id  in (select user_id from post_likes where post_id=$1) ',
    [postId]
  );
};

module.exports = {
  createPost,
  deletePost,
  getPostById,
  getUserPosts,
  updatePostContent,
  addNewPostLike,
  removePostLike,
  getPostLikes,
  getAllPosts,
  deleteUserPosts,
  isPostLikeExsist,
};
