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
    minlength: 8,
    validator: function (v) {
      return /^[0-9]{2,3}-[0-9]+$/.test(v);
    },
    message: props => `${props.value} is not a valid phone number!`
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person