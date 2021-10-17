const db = require('../config/connection');

const createUser = (name, email, password, img) => {
  return db.query(
    'INSERT INTO users (name, email,password,img_url) VALUES ($1, $2,$3,$4) returning *',
    [name, email, password, img]
  );
};

const deleteUser = userId => {
  return db.query('DELETE FROM users WHERE id=$1 returning *', [userId]);
};
const findUserByEmail = email => {
  return db.query('select * from users where email=$1', [email]);
};
module.exports = {
  createUser,
  deleteUser,
  findUserByEmail,
};
