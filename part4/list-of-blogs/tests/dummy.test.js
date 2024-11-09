const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list-helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('dummy', () => {
  describe('totalLikes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const listWithManyBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422bb71b54a676234d17f9',
        title: 'Another Blog Post',
        author: 'John Doe',
        url: 'https://example.com',
        likes: 10,
        __v: 0
      }
    ]

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithManyBlogs)
      assert.strictEqual(result, 15)
    })

  })

  describe('favorite blog', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        url: 'http://example.com/1',
        likes: 5,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Blog 2',
        author: 'Author 2',
        url: 'http://example.com/2',
        likes: 12,
        __v: 0,
      },
      {
        _id: '3',
        title: 'Blog 3',
        author: 'Author 3',
        url: 'http://example.com/3',
        likes: 8,
        __v: 0,
      },
    ];

    test('when list is empty, returns null', () => {
      const result = listHelper.favoriteBlog([])
      assert.strictEqual(result, null)
    })

    test('when list has only one blog, it returns that blog', () => {
      const result = listHelper.favoriteBlog([blogs[0]]);
      assert.deepStrictEqual(result, {
        title: 'Blog 1',
        author: 'Author 1',
        likes: 5,
      });
    });

    test('when list has multiple blogs, returns the one with most likes', () => {
      const result = listHelper.favoriteBlog(blogs);
      assert.deepStrictEqual(result, {
        title: 'Blog 2',
        author: 'Author 2',
        likes: 12,
      });
    });
  })
})   