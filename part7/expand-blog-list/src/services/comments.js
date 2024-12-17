import axios from 'axios'

const baseUrl = '/api/blogs'

const addComment = async (blogId, commentData) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentData)
  return response.data
}

export default { addComment }
