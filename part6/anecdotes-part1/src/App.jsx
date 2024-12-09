import { NotificationProvider } from './context/NotificationContext'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <NotificationProvider>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </NotificationProvider>
  )
}

export default App

