import { createSlice } from '@reduxjs/toolkit'
import { setTimedNotification } from '../notificationReducer'
import axios from 'axios'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
      return [...state].sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:3001/anecdotes')
    dispatch(setAnecdotes(response.data.sort((a, b) => b.votes - a.votes)))
  }
}


export const handleCreateAnecdote = (content) => {
  return async (dispatch) => {

    const newAnecdote = {
      content,
      votes: 0,
    }

    const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote)

    dispatch(createAnecdote(response.data))

    dispatch(setTimedNotification(`You created '${content}'`, 5))
  }
}

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const handleVote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdoteToVote = anecdotes.find((a) => a.id === id)

    if (anecdoteToVote) {
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      const response = await axios.put(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote)
      dispatch(voteAnecdote(response.data))
      dispatch(setTimedNotification(`You voted '${anecdoteToVote.content}'`, 5))
    }
  }
}


export default anecdoteSlice.reducer
