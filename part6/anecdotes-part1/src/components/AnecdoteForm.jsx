import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })


  const handleSubmit = (event) => {
    event.preventDefault()
    if (content.length >= 5) {
      mutation.mutate({ content, votes: 0 })
      setContent('')
    } else {
      alert('Content must be at least 5 characters long')
    }
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" disabled={mutation.isLoading}>{mutation.isLoading ? 'Creating...' : 'Create'}</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
