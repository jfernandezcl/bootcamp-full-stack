import PropTypes from 'prop-types';  // Asegúrate de importar PropTypes
import { Link, useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const selectedAnecdote = anecdotes.find((a) => a.id === parseInt(id));

  if (!selectedAnecdote) {
    return <div>Anecdote not found</div>;
  }

  return (
    <div>
      <h2>{selectedAnecdote.content} by {selectedAnecdote.author}</h2>
      <p>{selectedAnecdote.info}</p>
      <p>Has {selectedAnecdote.votes} votes</p>
      <Link to="/">Back to anecdotes</Link>
    </div>
  );
};

Anecdote.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Anecdote;

