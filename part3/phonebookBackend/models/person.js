const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection established');
  })
  .catch(errorReport => {
    console.log('Cannot connect: ', errorReport.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  phoneNumber: { type: String, required: true, minlength: 8 }
});

personSchema.plugin(uniqueValidator, { message: 'Error, expected \'name\' to be unique. \nTo resolve this, you need to remove document with \'name\' of {VALUE} or change it\'s {PATH} with something else.' });

personSchema.set('toJSON', {
  transform: (inputDocument, documentResult) => {
    documentResult.id = documentResult._id;
    documentResult.number = documentResult.phoneNumber;
    delete documentResult._id;
    delete documentResult.phoneNumber;
    delete documentResult.__v;
  }
});


module.exports = new mongoose.model('Person', personSchema);