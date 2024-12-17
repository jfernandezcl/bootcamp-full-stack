import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './actions/blogs'
import PropTypes from 'prop-types'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './actions/notification'
import { clearUser, setUser } from './reducers/user'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from "./Blog"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, user])

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await loginService.login(credentials)
      localStorage.setItem('loggedBlogUser', JSON.stringify(loggedInUser))
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
      dispatch(setNotification('Login successful'))
    } catch (error) {
      dispatch(setNotification('Invalid username or password', true))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogUser')
    dispatch(clearUser())
    dispatch(setNotification('Logged out successfully'))
  }

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      dispatch(setNotification(`Blog "${blog.title}" added successfully`))
    } catch (error) {
      dispatch(setNotification('Error adding blog', true))
    }
  }

  const modifyBlog = async (id, updatedData) => {
    try {
      dispatch(updateBlog(id, updatedData))
      dispatch(setNotification('Blog updated successfully'))
    } catch (error) {
      dispatch(setNotification('Error updating blog', true))
    }
  }

  const removeBlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id)
    if (!window.confirm(`Do you really want to delete "${blogToDelete.title}"?`)) return

    try {
      dispatch(deleteBlog(id))
      dispatch(setNotification(`Blog "${blogToDelete.title}" deleted successfully`))
    } catch (error) {
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
    <Router>
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>
          Logged in as {user.name}{' '}
          <button onClick={handleLogout}>Logout</button>
        </p>

        <nav>
          <Link to="/users">Users</Link>
        </nav>

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/" element={
            <div>
              <Togglable buttonLabel="Create new blog">
                <BlogForm createBlog={addBlog} />
              </Togglable>
              <div>
                {blogs
                  .slice()
                  .sort((a, b) => b.likes - a.likes)
                  .map((blog) => (
                    <div key={blog.id}>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </div>
                  ))}
              </div>
            </div>
          } />
          <Route path="/blogs/:blogId" element={<BlogView />} />
        </Routes>
      </div>
    </Router>
  )
}

App.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
}

export default App

