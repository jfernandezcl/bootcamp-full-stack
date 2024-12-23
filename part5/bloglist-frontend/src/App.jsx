/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

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
      showNotification('Login successful')
    } catch (error) {
      showNotification('Invalid username or password', true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogUser')
    setUser(null)
    showNotification('Logged out successfully')
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      showNotification(`Blog "${newBlog.title}" added successfully`)
    } catch (error) {
      showNotification('Error adding blog', true)
    }
  }

  const showNotification = (message, isError = false) => {
    setNotification({ message, isError })
    setTimeout(() => setNotification(null), 5000)
  }

  const updatedBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map((blog) => (blog.id === id ? returnedBlog : blog)))
      showNotification(`Blog "${returnedBlog.title}" updated successfully`)
    } catch (error) {
      console.error('Error updating blog:', error)
      showNotification('Error updating blog', true)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blogToDelete = blogs.find((b) => b.id === id)
      const confirm = window.confirm(`Do you really want to delete "${blogToDelete.title}"?`)
      if (!confirm) return
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      showNotification(`Blog "${blogToDelete.title}" deleted successfully`)
    } catch (error) {
      console.error('Error deleting blog:', error)
      showNotification('Error deleting blog', true)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && (
          <Notification message={notification.message} isError={notification.isError} />
        )}
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      {notification && (
        <Notification message={notification.message} isError={notification.isError} />
      )}
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
  notification: PropTypes.object,
}

export default App