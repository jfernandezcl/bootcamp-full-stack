const Notification = ({ message, isError }) => {
  if (!message) return null

  const style = {
    color: isError ? 'red' : 'green',
    background: '#f4f4f4',
    border: `1px solid ${isError ? 'red' : 'green'}`,
    padding: '10px',
    marginBottom: '10px',
  }

  return <div style={style}>{message}</div>
}

export default Notification
