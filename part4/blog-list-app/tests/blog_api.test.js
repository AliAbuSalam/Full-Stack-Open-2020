const mongoose = require('mongoose');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const initialUsers = helper.initialUsers;
  for (const user of initialUsers) {
    user.passwordHash = await bcrypt.hash(user.password, 10);
  }
  const initialUsersObjects = initialUsers.map(user => new User(user));
  const usersPromiseArray = initialUsersObjects.map(object => object.save());
  await Promise.all(usersPromiseArray);

  const firstUser = await User.findOne({ username: helper.initialUsers[0].username });
  console.log('firstUser is ', firstUser);
  console.log('firstUser _id property type is ', typeof firstUser._id);
  const blogsToSave = helper.initialBlogs;
  blogsToSave.forEach(blog => {
    blog.user = firstUser._id.toString();
  });
  console.log('blogsToSave is ', blogsToSave);
  const initialBlogsObjects = blogsToSave.map(blog => new Blog(blog));
  const blogsPromiseArray = initialBlogsObjects.map(object => object.save());
  await Promise.all(blogsPromiseArray);
});

const getToken = async (username, password) => {
  const userId = {
    username: username,
    password: password
  };
  const loginResult = await api
    .post('/api/login')
    .send(userId);

  return loginResult.body.token;
};

test('Fetching blogs from database returns the right list', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('fetched blogs has id property',async () => {
  const result = await api.get('/api/blogs');
  const blogList = result.body;
  expect(blogList[0].id).toBeDefined();
});

test('posting blog to database and verifying the returned data', async () => {
  const user = helper.initialUsers[0];
  const loginUser = await api
    .post('/api/login')
    .send({
      username: user.username,
      password: user.password
    })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const token = loginUser.body.token;

  const newBlog = {
    title: 'How to build your own pc',
    author: 'Linus',
    url: 'http://www.lttstore.com/tutorial/how-to-build-your-own-pc',
    likes: 3551
  };

  const result = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const modifiedBlogsInDb = await helper.fetchBlogsDatabase();
  expect(modifiedBlogsInDb).toHaveLength(helper.initialBlogs.length + 1);

  const newestBlogsInDb = result.body;
  const testToCheckNewestBlogsInDb = newestBlogsInDb.title === newBlog.title
    && newestBlogsInDb.author === newBlog.author
    && newestBlogsInDb.likes === newBlog.likes
    && newestBlogsInDb.url === newBlog.url;
  expect(testToCheckNewestBlogsInDb).toBe(true);
});

test('posting blog with empty title and url leads to the expected error', async () => {
  const user = helper.initialUsers[0];

  const token = await getToken(user.username, user.password);

  let newBlog = {
    author: 'Linus',
    url: 'http://www.lttstore.com/tutorial/how-to-build-your-own-pc',
    likes: 0
  };

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(400);

  newBlog = {
    title: 'How to build your own pc',
    author: 'Linus',
    likes: 0
  };
  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(400);
});

test('blog model likes property has default of 0', async () => {
  const user = helper.initialUsers[0];
  const token = await getToken(user.username, user.password);
  const newBlog = {
    title: 'How to build your own pc',
    author: 'Linus',
    url: 'http://www.lttstore.com/tutorial/how-to-build-your-own-pc'
  };

  const resultOfPostingBlog = await api.post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog);
  const postedBlog = resultOfPostingBlog.body;
  expect(postedBlog).toBeDefined();
  expect(postedBlog.likes).toBe(0);
});

test('succeeds deleting a blog with a valid id', async () => {
  const user = helper.initialUsers[0];
  const token = await getToken(user.username, user.password);
  const blogsInDB = await helper.fetchBlogsDatabase();
  const blogIdToDelete = blogsInDB[0].id;
  await api
    .delete(`/api/blogs/${blogIdToDelete}`)
    .set('Authorization', 'bearer ' + token)
    .expect(204);
});

test('deleting a blog with an invalid id returns the expected response', async () => {
  const user = helper.initialUsers[0];
  const token = await getToken(user.username, user.password);
  const invalidId = '5f0f6f22e796d71e5e0d5e0b';
  await api
    .delete(`/api/blogs/${invalidId}`)
    .set('Authorization', 'bearer ' + token)
    .expect(204);
});

test('posting a blog without token returns the expected error', async () => {
  const newBlog = {
    title: 'test',
    author: 'me',
    url: 'www.test.com',
    likes: 1
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);
});

test('test for mostBlog method', async () => {
  const blogsArray = await api
    .get('/api/blogs');

  helper.mostBlogs(blogsArray.body);
});

test('test for mostLikes method', async () => {
  const blogsArray = await api
    .get('/api/blogs');

  helper.mostLikes(blogsArray.body);
});

afterAll(() => {
  mongoose.connection.close();
});