const filterReduce = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  }
}

export default filterReduce