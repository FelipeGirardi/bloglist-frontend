import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAllBlogs, createBlog, updateBlog }