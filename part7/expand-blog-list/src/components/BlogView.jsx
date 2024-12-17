import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Blog from "./Blog"

const BlogView = () => {
  const { blogId } = useParams()
  const blogs = useSelector((state) => state.blogs)

  // Buscar el blog por ID
  const blog = blogs.find((b) => b.id === blogId)

  if (!blog) {
    return <p>Blog not found</p>
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>by {blog.user.name}</p>
      <p>{blog.content}</p>
      <Link to="/">Back to blogs</Link>
    </div>
  )
}

export default BlogView
