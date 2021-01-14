import express from 'express';
import patientsService from '../services/patientsService';
import parseToPatient, { parseEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getNonSensitiveData());
});

router.post('/', (req, res) => {
  try{
    const newPatient = parseToPatient(req.body);
    const addedPatient = patientsService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch(error) {
    console.log('error: ', error.message);
    res.status(400).json(error.message);
  }
});

router.get('/:id', (req, res) => {
  const idToFetch = req.params.id;
  const patient = patientsService.getAPatient(idToFetch);
  if(!patient){
    res.sendStatus(404);
  } else {
    res.json(patient);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entryToAdd = parseEntry(req.body);
  const addingEntryToPatient = patientsService.addEntryToPatient(entryToAdd, id);
  if(!addingEntryToPatient){
    res.sendStatus(404);
  } else {
    res.json(addingEntryToPatient);
  }
});

export default router;