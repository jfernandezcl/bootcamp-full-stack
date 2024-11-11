const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');


const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Author 1',
    url: 'http://test1.com',
    likes: 5,
  },
  {
    title: 'Test Blog 2',
    author: 'Author 2',
    url: 'http://test2.com',
    likes: 7,
  }
];

jest.setTimeout(30000);

beforeEach(async () => {
  console.log('Connecting to the database...');
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
});

test('blogs are returned as JSON and have the correct amount', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a blog can be added', async () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'Javi',
    url: 'http://example.com',
    likes: 10,
  };

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);

  expect(titles).toContain('New Blog Post');
});

afterAll(async () => {
  await mongoose.connection.close();
});
