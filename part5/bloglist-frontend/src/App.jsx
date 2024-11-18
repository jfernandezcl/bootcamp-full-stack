import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

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
      setErrorMessage('')
    } catch (error) {
      setErrorMessage('Invalid username or password')
      setTimeout(() => setErrorMessage(''), 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const createBlog = (blog) => {
    blogService
      .create(blog)
      .then((newBlog) => {
        setBlogs(blogs.concat(newBlog))
      })
      .catch((error) => {
        console.error('Error when creating the blog:', error)
        setErrorMessage('Error adding blog')
        setTimeout(() => setErrorMessage(''), 5000)
      })
  }


  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>Logged in as {user.name} <button onClick={handleLogout}>Logout</button>
      </p>
      <BlogForm createBlog={createBlog} />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App