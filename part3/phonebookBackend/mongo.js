const mongoose = require('mongoose');

if(process.argv.length < 3){
  console.log('Please enter the password');
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://Askell:${password}@cluster0-6z4vk.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
});

const Person = mongoose.model('Person', personSchema);

if(process.argv.length === 3){
  console.log('phonebook:');
  Person.find({}).then(result => {
    result.forEach(personData => {
      console.log(`${personData.name} ${personData.phoneNumber}`);
    });
    mongoose.connection.close();
  });
}
if(process.argv.length >= 5){
  const person = new Person({
    name: process.argv[3],
    phoneNumber: process.argv[4]
  });
  person.save().then(() => {
    console.log(`added ${person.name} number ${person.phoneNumber} to phonebook`);
    mongoose.connection.close();
  });
}