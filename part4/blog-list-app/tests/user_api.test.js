const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const listOfUsersToSave = helper.initialUsers.map(user => new User(user));
  const listOfUsersPromises = listOfUsersToSave.map(user => user.save());
  await Promise.all(listOfUsersPromises);
});

test('fetch list of users', async () => {
  const initialUsersList = helper.initialUsers;

  const fetchedUsersList = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(fetchedUsersList.body).toHaveLength(initialUsersList.length);
});

test('succeeds in creating new user', async () => {
  //const usersAtStart = await helper.fetchUsersDatabase();
  const usersAtStart = helper.initialUsers;

  const newUser = {
    username: 'Oboro',
    name: 'Vernice',
    password: 'zxcqwe'
  };

  const newUserSaveResponse = await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  const usersAtEnd = await helper.fetchUsersDatabase();
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  delete newUserSaveResponse.body.id;
  delete newUser.password;
  expect(newUserSaveResponse.body).toEqual(newUser);
});

test('Add new user with no username returns a suitable error', async () => {
  const usersAtStart = await helper.fetchUsersDatabase();

  const newUser = {
    name: 'Borgar',
    password: 'Geisen'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const usersAtEnd = await helper.fetchUsersDatabase();
  expect(usersAtEnd).toHaveLength(usersAtStart.length);
});
/*describe('Adding new user with invalid properties', () => {

});
*/
afterAll(() => {
  mongoose.connection.close();
});