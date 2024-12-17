// components/BlogView.jsx
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const BlogView = ({ blogId }) => {
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await blogService.getBlog(blogId)
        setBlog(fetchedBlog)
        setComments(fetchedBlog.comments)
      } catch (error) {
        console.error('Error fetching blog:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [blogId])

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    if (!newComment.trim()) return

    try {
      const comment = await commentService.addComment(blogId, { content: newComment })
      setComments((prevComments) => [...prevComments, comment]) // Agregar el nuevo comentario al estado
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {blog ? (
        <div className="blog-details">
          <h2>{blog.title}</h2>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <h3>Comments</h3>
          <div className="comments-section">
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.content}</li>
              ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              ></textarea>
              <button type="submit">Add Comment</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  )
}

export default BlogView

