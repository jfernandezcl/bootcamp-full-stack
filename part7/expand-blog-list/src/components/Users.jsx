import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const blogs = useSelector((state) => state.blogs)

  const userBlogCounts = blogs.reduce((acc, blog) => {
    const userId = blog.user.id
    const userName = blog.user.userName
    if (!acc[userId]) {
      acc[userId] = { name: userName, count: 0 }
    }
    acc[userId].count += 1
    return acc
  }, {})

  const users = Object.entries(userBlogCounts).map(([id, info]) => ({
    id,
    name: info.name,
    blogCount: info.count,
  }))

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
