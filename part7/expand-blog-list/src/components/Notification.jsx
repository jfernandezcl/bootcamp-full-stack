import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const style = {
    color: notification.isError ? 'red' : 'green',
    background: '#f4f4f4',
    border: `1px solid ${notification.isError ? 'red' : 'green'}`,
    padding: '10px',
    marginBottom: '10px',
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
