const express = require('express');
const Person = require('../mongo')
const router = express.Router();


router.get('/', (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(error => next(error))
});

router.post('/', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).send({ error: 'name and number are required' });
  }

  const person = new Person({ name, number })

  person.save()
    .then(savedPerson => res.json(savedPerson))
    .catch(error => next(error))
});

router.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
});

module.exports = router;
