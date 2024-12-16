export const setNotification = (message, isError = false) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { message, isError },
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}
