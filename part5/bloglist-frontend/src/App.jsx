import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

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
      blogService.getAll().then(blogs => setBlogs(blogs))
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
      showNotification('Invalid username or password')
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
      showNotification('Error adding blog')
    }
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(''), 5000)
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      <p>
        Logged in as {user.name}{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <BlogForm createBlog={createBlog} />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default App
