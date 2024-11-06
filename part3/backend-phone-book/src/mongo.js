const mongoose = require('mongoose');

const url = 'mongodb+srv://jfernandez:Harley-iron-883@cluster0.rilsr.mongodb.net/phonebook?retryWrites=true&w=majority';

mongoose.connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: true,
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person