const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data.blog : blog
      )
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.data)
    default:
      return state
  }
}

export default blogsReducer
