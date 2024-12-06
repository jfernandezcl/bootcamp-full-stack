import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { handleVote } from '../reducers/anecdoteReducer'
import { getAnecdotes } from '../services/anecdoteService'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const { data: anecdotes, isLoading, isError, error } = useQuery(
    ['anecdotes'],
    getAnecdotes,
    {
      retry: 1,
    }
  )

  const filter = useSelector((state) => state.filter)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>
        <h2>Error</h2>
        <p>Unable to fetch anecdotes. The anecdote service is unavailable.</p>
        <p>{error.message}</p>
      </div>
    )
  }

  const filteredAnecdotes = anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(handleVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList

