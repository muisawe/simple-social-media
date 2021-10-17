const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const multParse = require('./middlewares/multer');

const app = express();

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

app.use('/api', multParse); // use with form data

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // disable CROS for all websites
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST , PUT, DELETE'); //  Specify which methods allowed
  res.setHeader('Access-Control-Allow-Headers', 'Content-type , Authorization');
  next();
});

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  res.status(statusCode).json({
    message: message,
    data: error.data,
  });
});

app.listen(8080);
