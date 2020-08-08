const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (request, response) => {
  const body = request.body;
  const userToLogIn = await User.findOne({ username: body.username });
  const passwordCorrect = userToLogIn === null? false : await bcrypt.compare(body.password, userToLogIn.passwordHash);
  if(!passwordCorrect){
    return response.status(401).json({
      error: 'Invalid username or password'
    });
  }

  const userForToken = {
    username: userToLogIn.username,
    id: userToLogIn._id
  };
  const token = jwt.sign(userForToken, process.env.SECRET_KEY);
  response.status(200).json({
    token,
    username: userToLogIn.username,
    name: userToLogIn.name
  });
});

module.exports = loginRouter;