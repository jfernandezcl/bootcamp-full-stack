import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}

export default { getAll, setToken }