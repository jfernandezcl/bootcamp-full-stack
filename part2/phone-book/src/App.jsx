import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons';
import personsService from './personsService';
import Notification from './components/Notification'
import './index.css';


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
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleSearch = (e) => setSearchPerson(e.target.value)
  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleRemove = async (id) => {
    const personToRemove = persons.find(person => person.id === id);
    if (window.confirm(`Are you sure you want to remove ${personToRemove.name}?`)) {
      try {
        await personsService.remove(id);
        setPersons(persons.filter(person => person.id !== id));
      } catch (error) {
        console.error('Error removing person:', error);
        setNotificationMessage('Error removing person');
        setTimeout(() => setNotificationMessage(null), 3000);
      }
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialPersons = await personsService.getAll()
        setPersons(initialPersons)
      } catch (error) {
        console.error('Error fetching persons:', error)
        setNotificationMessage('Error fetching persons')
        setTimeout(() => setNotificationMessage(null), 3000)
      }
    }
    fetchData()
  }, [])



  const addPerson = async (event) => {
    event.preventDefault();

    if (newName.trim().length < 3) {
      setNotificationMessage('Name mist have at least 3 characters')
      setTimeout(() => setNotificationMessage(null), 3000)
      return
    }

    const phoneRegex = /^\d{2,3}-\d+$/;
    if (!phoneRegex.test(newNumber)) {
      setNotificationMessage('Invalid phone number format. It should be in the format "XX-XXXXXXX" or "XXX-XXXXXXXX".');
      setTimeout(() => setNotificationMessage(null), 3000);
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} already in the agenda, do you want to replace the number?`)) {
        try {
          const updatedPerson = await personsService.update(existingPerson.id, newPerson);
          setPersons(persons.map(person => (person.id === existingPerson.id ? updatedPerson : person)));
          setNotificationMessage(`The number of ${newName} was successfully updated.`);
        } catch (error) {
          console.error('Error updating person:', error);
          setNotificationMessage('Error updating person');
        }
      }
    } else {
      try {
        const returnedPerson = await personsService.create(newPerson);
        setPersons(persons.concat(returnedPerson));
        setNotificationMessage(`Added ${newName} to the agenda`);
      } catch (error) {
        console.error('Error adding person:', error);
        setNotificationMessage('Error adding person');
      }
    }
    setTimeout(() => setNotificationMessage(null), 3000);
    setNewName('');
    setNewNumber('');
  };


  const personsShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
