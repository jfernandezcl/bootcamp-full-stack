const mongoose = require('mongoose');

const password = process.argv[2]; // Getting password from command line arguments
const url = `mongodb+srv://username:${password}@cluster.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
    const personSchema = new mongoose.Schema({
      name: String,
      number: String,
    });
    const Person = mongoose.model('Person', personSchema);

    if (process.argv.length === 3) {
      // If only the password is provided, list all entries
      Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
          console.log(person.name, person.number);
        });
        mongoose.connection.close();
      });
    } else if (process.argv.length === 5) {
      // If name and number are provided, add a new entry
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({
        name: name,
        number: number,
      });

      person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      });
    } else {
      console.log('Please provide the correct number of arguments');
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.log('Error connecting to MongoDB:', err.message);
  });
