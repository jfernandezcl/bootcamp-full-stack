import axios from "axios";

const baseUrl = 'http://localhost:3003/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = async (newPerson) => {
  try {
    const response = await axios.post(baseUrl, newPerson)
    return response.data
  } catch (error) {
    console.error('Error creating person:', error)
    throw error
  }
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

const update = async (id, newPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newPerson)
    return response.data
  } catch (error) {
    console.error('Error updating person:', error)
    throw error
  }
}

export default { getAll, create, remove, update }