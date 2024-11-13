const mongoose = require('mongoose')
const supertest = require('supertest')
const bcryptjs = require('bcryptjs')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcryptjs.hash('password', 10)
  const user = new User({ username: 'root', name: 'Root User', passwordHash })

  await user.save()
})

describe('when creating a new user', () => {
  test('succeeds with a fresh username', async () => {
    const newUser = {
      username: 'uniqueUser',
      name: 'Unique User',
      password: 'strongpassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await User.find({});
    expect(usersAtEnd).toHaveLength(2);
    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('fails with status code 400 if username is taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Another User',
      password: 'password123',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username must be unique')
  })

  test('fails with status code 400 if username is too short', async () => {
    const newUser = {
      username: 'ab',
      name: 'Short User',
      password: 'password123',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('username must be at least 3 characters long');
  })

  test('fails with status code 400 if password is too short', async () => {
    const newUser = {
      username: 'validUser',
      name: 'Valid User',
      password: 'pw',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('password must be at least 3 characters long');
  });

  test('fails with status code 400 if username or password is missing', async () => {
    const newUser = {
      name: 'Missing Fields User',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400);

    expect(result.body.error).toContain('username must be at least 3 characters long');
  });

})