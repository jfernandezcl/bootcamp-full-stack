import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const userBlogs = blogs.filter((blog) => blog.user.id === id)

  if (userBlogs.length === 0) {
    return <p>No blogs found for this user</p>
  }

  return (
    <div>
      <h2>{userBlogs[0].user.name}</h2>
      <h3>Added blogs:</h3>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
