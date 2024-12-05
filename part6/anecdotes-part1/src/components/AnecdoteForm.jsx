import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleCreateAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (content) {
      dispatch(handleCreateAnecdote(content))
      setContent('')
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
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
