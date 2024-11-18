const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  const notificationStyle = {
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid',
    borderRadius: '5px',
    backgroundColor: '#f4f4f4',
  }
  return <div style={notificationStyle}>{message}</div>
}

export default Notification