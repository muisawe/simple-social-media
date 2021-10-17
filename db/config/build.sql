BEGIN;

DROP TABLE IF EXISTS users, posts, post_likes, comments, comment_likes CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,  
  name VARCHAR(12) NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT Null,
  img_url VARCHAR
  );

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  content VARCHAR NOT NULL,
  created_at Date
);

CREATE TABLE post_likes(
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  UNIQUE(user_id,post_id)

);

CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id),
  user_id INTEGER REFERENCES users(id),
  content VARCHAR NOT NULL,
  created_at Date
);

CREATE TABLE comment_likes(
  user_id INTEGER REFERENCES users(id),
  comment_id INTEGER REFERENCES comments(id),
  UNIQUE(user_id,comment_id)
);

COMMIT;