import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, currentUser }) => {
  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog.id)
  }

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
      {currentUser && currentUser.username === blog.user.username && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
}

export default Blog
