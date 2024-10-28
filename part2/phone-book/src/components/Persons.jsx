const Persons = ({ personsShow, handleRemove }) => {
  return (
    <ul>
      {personsShow.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={handleRemove(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons