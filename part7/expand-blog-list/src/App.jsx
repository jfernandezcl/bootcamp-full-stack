import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification, clearNotification } from './actions/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await loginService.login(credentials)
      localStorage.setItem('loggedBlogUser', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      dispatch(setNotification('Login successful'))
    } catch (error) {
      dispatch(setNotification('Invalid username or password', true))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogUser')
    setUser(null)
    dispatch(setNotification('Logged out successfully'))
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      dispatch(setNotification(`Blog "${newBlog.title}" added successfully`))
    } catch (error) {
      dispatch(setNotification('Error adding blog', true))
    }
  }

  const updatedBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)))
      dispatch(setNotification(`Blog "${returnedBlog.title}" updated successfully`))
    } catch (error) {
      console.error('Error updating blog:', error)
      dispatch(setNotification('Error updating blog', true))
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blogToDelete = blogs.find((b) => b.id === id)
      const confirm = window.confirm(`Do you really want to delete "${blogToDelete.title}"?`)
      if (!confirm) return
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      dispatch(setNotification(`Blog "${blogToDelete.title}" deleted successfully`))
    } catch (error) {
      console.error('Error deleting blog:', error)
      dispatch(setNotification('Error deleting blog', true))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        Logged in as {user.name}{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="Create new blog">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={(updatedBlog) => updatedBlog(blog.id, updatedBlog)}
              deleteBlog={deleteBlog}
              currentUser={user}
            />
          ))}
      </div>
    </div>
  )
}

App.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
}

export default App
