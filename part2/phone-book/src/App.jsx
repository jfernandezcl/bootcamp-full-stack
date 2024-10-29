import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons';
import axios from 'axios';
import personsService from './personsService';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')

  const handleSearch = (e) => setSearchPerson(e.target.value)
  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleRemove = async (id) => {
    if (window.confirm(`Are you sure you want to remove ${id}?`)) {
      await personsService.remove(id)
      setPersons(persons.filter(persons => persons.id !== id))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const initialPersons = await personsService.getAll()
      setPersons(initialPersons)
    }
    fetchData
  }, [])



  const addPerson = async (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} already in the agenda, do you want to replace the number?`)) {
        const updatedPerson = await personsService.update(existingPerson.id, newPerson)
        setPersons(persons.map(persons => (persons.id === existingPerson.id ? updatedPerson : persons)))
      }
    }
    else {
      const returnedPerson = await personsService.create(newPerson)
      setPersons(persons.concat(returnedPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonsForm
        addPerson={addPerson}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons personsShow={personsShow} handleRemove={handleRemove} />
    </div>
  )
}

export default App
