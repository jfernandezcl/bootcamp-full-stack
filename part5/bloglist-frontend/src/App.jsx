import { useState, useEffect } from 'react'
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

    const createBlog = async (blog) => {
      try {
        const newBlog = await blogService.create(blog)
        setBlogs(blogs.concat(newBlog))
        showNotification(`Blog "${newBlog.title}" added successfully`)
        showNotification('Error adding blog', true)
      }
  }

    const showNotification = (message, isError = false) => {
      setNotification({ message, isError })
      setTimeout(() => setNotification(null), 5000)
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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    )
  }

  export default App
