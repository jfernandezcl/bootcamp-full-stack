const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const isError = message.toLowerCase().includes('error')

  return (
    <div className={`notification ${isError ? 'error' : ''}`}>
      {message}
    </div>
  )
}

export default Notification