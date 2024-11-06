const mongoose = require('mongoose');

const url = 'mongodb+srv://jfernandez:Harley-iron-883@cluster0.rilsr.mongodb.net/phonebook?retryWrites=true&w=majority';

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person