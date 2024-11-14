const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user')

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
  await Blog.deleteMany({});
  await Blog.deleteMany({});

  const user = new User({ username: 'testuser', password: 'password123' })
  await user.save()

  token = jwt.sign({ id: user._id }, process.env.SECRET)

  for (let blog of initialBlogs) {
    let blogObject = new Blog({ ...blog, user: user._id });
    await blogObject.save();
  }
});

test('blogs are returned as JSON and have the correct amount', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('the unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
})

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

test('a valid blog can be added and increases the total count by one', async () => {
  const newBlog = {
    title: 'Another New Blog',
    author: 'Another Author',
    url: 'http://anotherexample.com',
    likes: 15,
  }

  const blogsAtStart = await api.get('/api/blogs')

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1)

  const contents = blogsAtEnd.body.map(b => b.title)
  expect(contents).toContain(newBlog.title)
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'Blog Without Likes',
    author: 'No Likes Author',
    url: 'http://nolikes.com',
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).tobe(0)
})

test('should return 400 Bad Request if title or url is missing', async () => {
  const newBlogWithoutTitle = {
    author: 'Javi',
    url: 'http://example.com',
    likes: 10,
  };

  const newBlogWithoutUrl = {
    title: 'New Blog Post',
    author: 'Javi',
    likes: 10,
  };

  await api.post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

  await api.post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const blogToDelete = initialBlogs[0]

  const blogsAtStart = await api.get('/api/blogs')
  await api.delete(`/api/blogs/${blogsAtStart.body[0].id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body) - toHaveLength(blogsAtStart.body.length - 1)

  expect(blogsAtEnd.body.map(blog => blog.title)).not.toContain(blogToDelete.title)
})

test('returns 404 if blog to delete does not exist', async () => {
  const nonExistingId = mongoose.Types.ObjectId()
  await api.delete(`/api/blogs/${nonExistingId}`)
    .expect(404)
})

// test for the update
test('likes can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updatedLikes = blogToUpdate.likes + 1
  const updatedBlog = { likes: updatedLikes }

  const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(updatedLikes)
})

test('returns 400 if likes is missing when updating', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  await api.put(`/api/blogs/${blogToUpdate.id}`)
    .send({})
    .expect(400)
})

test('returns 404 if the blog to update does not exist', async () => {
  const nonExistingId = mongoose.Types.ObjectId()
  await api.put(`/api/blogs/${nonExistingId}`)
    .send({ likes: 10 })
    .expect(404)
})

afterAll(async () => {
  await mongoose.connection.close();
});
