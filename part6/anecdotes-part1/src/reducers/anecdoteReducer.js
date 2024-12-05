import { createSlice } from '@reduxjs/toolkit'
import { setTimedNotification } from '../notificationReducer'
import axios from 'axios'


const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes,
  }
}

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
      const newAnecdote = {
        content: action.payload.content,
        id: action.payload.id,
        votes: 0,
      }
      return [...state, newAnecdote]
    },
    setAnecdotes(action) {
      return action.payload
    }
  },
})


export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get('http://localhost:3001/anecdotes')
    const anecdotes = response.data.map(asObject)
    dispatch(setAnecdotes(anecdotes))
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


    dispatch(setTimedNotification(`You created '${content}'`, 5000))
  }
}

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const handleVote = (id) => {
  return (dispatch, getState) => {
    dispatch(voteAnecdote(id))
    const anecdote = getState().anecdotes.find((a) => a.id === id)
    dispatch(setTimedNotification(`You voted '${anecdote.content}'`, 5000))
  }
}

export default anecdoteSlice.reducer
