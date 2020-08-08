const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const bloglist = await Blog.find({}).populate('user', { blog: 0 });
  response.json(bloglist);
});

blogsRouter.post('/', async (request, response) => {
  const token = request.token;
  if(!token){
    return response.status(401).json({ error: 'Token is missing' });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  if(!decodedToken.id){
    return response.status(40).json({ error: 'Token is invalid' });

  }
  const userForBlog = await User.findById(decodedToken.id);

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: userForBlog._id
  };
  const blog = new Blog(newBlog);
  userForBlog.blog = userForBlog.blog.concat(blog);
  const result = await blog.save();
  await userForBlog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token;
  if(!token){
    response.status(401).json({ error: 'Cannot delete blog before logging in' });
    return;
  }

  const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  const idToDelete = request.params.id;
  const blogToDelete = await Blog.findById(idToDelete);

  if(!blogToDelete){
    response.status(204).end();
    return;
  }

  if(decodedToken.id !== blogToDelete.user.toString()){
    response.status(401).json({ error: 'Only the creator of the blog is allowed to delete this blog' });
    return;
  }

  await Blog.findByIdAndDelete(idToDelete);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const idToUpdate = request.params.id;
  const newBlog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(idToUpdate, newBlog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;