import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import Anecdote from './components/anecdote.jsx';
import { useField } from './hooks/index.js';


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>))}
    </ul>
  </div>
)

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is &quot;a story with a point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a>{''}
    for the source code.
  </div>
)

const CreateNew = (addNew) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    })
    content.reset()
    author.reset()
    info.reset()
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...{ ...content, reset: undefined }} />
        </div>
        <div>
          author
          <input  {...{ ...author, reset: undefined }} />
        </div>
        <div>
          url for more info
          <input  {...{ ...info, reset: undefined }} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>Reset</button>
      </form>
    </div>
  )

}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote "${anecdote.content}" was created!`)
    setTimeout(() => setNotification(''), 5000)
  }

  //const anecdoteById = (id) =>
  //anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id);

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   };

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a));
  // };


  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        {notification && <div style={{ border: '1px solid green', padding: '10px', margin: '10px 0' }}>{notification}</div>}
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}></Route>
          <Route path='/create' element={<CreateNew addNew={addNew} />}></Route>
          <Route parh='/about' element={<About />}></Route>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
