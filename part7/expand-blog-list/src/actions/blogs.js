import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'CREATE_BLOG',
      data: blog,
    })
  }
}

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { id, blog },
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}
