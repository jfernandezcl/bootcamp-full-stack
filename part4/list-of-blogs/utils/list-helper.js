const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((prev, current) => {
    return current.likes > prev.likes ? current : prev;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorsCount = _.countBy(blogs, 'author');
  const authorWithMostBlogs = _.maxBy(Object.keys(authorsCount), (author) => authorsCount[author]);

  return {
    author: authorWithMostBlogs,
    blogs: authorsCount[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesByAuthor = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const authorWithMostLikes = _.maxBy(Object.keys(likesByAuthor), (author) => likesByAuthor[author]);

  return {
    author: authorWithMostLikes,
    likes: likesByAuthor[authorWithMostLikes],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
