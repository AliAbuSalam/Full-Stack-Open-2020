require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');


app.use(express.json());
app.use(cors());
app.use(express.static('build'));
app.use(morgan((tokens, req, res) => {
  return [tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'Content-length'),
    '-',
    tokens['response-time'](req,res),
    'ms',
    JSON.stringify(req.body)].join(' ');
}));

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.status(200).json(result);
  });
});

app.get('/info', (req, res) => {
  const arrivedDate = new Date();
  Person.find().countDocuments((error, count) => {
    console.log(count);
    res.send(`<p>Phonebook has info for ${count} people<p/>
      ${arrivedDate}`);
  });
});

app.get('/api/persons/:personId', (req, res, next) => {
  console.log(req.params.personId);
  Person.findById(req.params.personId)
    .then(result => {
      console.log(result);
      if(result){
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:personId', (req, res, next) => {
  console.log(req.params.personId);
  Person.findByIdAndRemove(req.params.personId)
    .then(result => {
      if(!result){
        res.status(404).end();
      }
      console.log(result);
      res.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
  const personToAdd = req.body;

  const person = new Person({
    name: personToAdd.name,
    phoneNumber: personToAdd.number
  });
  person.save()
    .then(document => {
      console.log(document);
      res.json(document);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:personId', (req, res, next) => {
  const person = {
    name: req.body.name,
    phoneNumber: req.body.number
  };
  console.log('person data: ', person);
  Person.findByIdAndUpdate(req.params.personId, person, { new: true, runValidators: true, context:'query' })
    .then(updatedPerson => {
      console.log(updatedPerson);
      res.json(updatedPerson);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.name);
  if(error.name === 'CastError'){
    res.status(404).send({ error: 'malformatted id' });
  }
  if(error.name === 'ValidationError'){
    console.log(error.message);
    res.status(409).send(error.message);
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});