const User = require('../models/user');
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');

usersRouter.get('/', async (request, response) => {
  const listOfUsers = await User.find({}).populate('blog', { user: 0, likes: 0 });
  response.json(listOfUsers);
});

usersRouter.post('/', async (request, response) => {
  const userData = request.body;

  if(!userData.password || userData.password.length < 3){
    const passwordError = new Error;
    passwordError.name = 'passwordError';
    throw passwordError;
  }
  const saltRound = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRound);
  const userToCreate = {
    username: userData.username,
    name: userData.name,
    passwordHash: passwordHash
  };

  const newUser = new User(userToCreate);
  const createdUser = await newUser.save();
  response.json(createdUser);
});

module.exports = usersRouter;