const PersonsForm = ({ addPerson, newName, handleName, newNumber, handleNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleName} />
      </div>
      <h2>add a new</h2>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonsForm