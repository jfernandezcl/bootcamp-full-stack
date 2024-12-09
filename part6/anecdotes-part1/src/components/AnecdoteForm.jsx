import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdoteService'
import { useNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  // Configura la mutación para crear una anécdota
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'])
      dispatch({ type: 'SET_NOTIFICATION', payload: `Anecdote '${newAnecdote.content}' created!` })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: `Error: ${error.response.data.error}` })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (content.length < 5) {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'Anecdote must be at least 5 characters long' })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
      return
    }
    newAnecdoteMutation.mutate({ content, votes: 0 })
    setContent('')
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
