require('express-async-errors');
const cors = require('cors');
const express = require('express');
const app = express();
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.use(middleware.morgan('logger'));
app.use(middleware.tokenExtractor);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);
if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}
app.use(middleware.errorHandler);

module.exports = app;