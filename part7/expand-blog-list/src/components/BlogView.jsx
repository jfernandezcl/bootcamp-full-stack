import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const BlogView = ({ blogId }) => {
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      const fetchedBlog = await blogService.getBlog(blogId)
      setBlog(fetchedBlog)
      setComments(fetchedBlog.comments) // Asumiendo que el backend te pasa los comentarios al obtener el blog
    }
    fetchBlog()
  }, [blogId])

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    if (!newComment.trim()) return

    try {
      const comment = await commentService.addComment(blogId, { content: newComment })
      setComments(comments.concat(comment))
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <div>
      {blog ? (
        <div>
          <h2>{blog.title}</h2>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <h3>Comments</h3>
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default BlogView

