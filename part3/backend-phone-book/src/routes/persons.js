const express = require('express');
const router = express.Router();

const persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" }
];

router.get('/', (req, res) => {
  res.json(persons);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

router.delete('/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  const indexToRemove = persons.findIndex(entry => entry.id === personId);

  if (indexToRemove !== -1) {
    persons.splice(indexToRemove, 1);
    res.status(204).end();
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

router.post('/', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: 'name and number are required' });
  }

  const existingEntry = persons.find(entry => entry.name === name);
  if (existingEntry) {
    return res.status(400).send({ error: 'name must be unique' });
  }

  const newId = Math.floor(Math.random() * 1000000);
  const newEntry = { id: newId, name, number };

  persons.push(newEntry);
  res.status(201).json(newEntry);
});

router.get('/info', (req, res) => {
  const totalPersons = persons.length;
  const requestTime = new Date();

  res.send(`
    <p>Phonebook has info for ${totalPersons} people</p>
    <p>${requestTime}</p>
    `);
});

module.exports = router;
