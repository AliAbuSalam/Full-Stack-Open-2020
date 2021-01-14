import express from 'express';
import diagnoseService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnosesData = diagnoseService.getData();
  res.json(diagnosesData);
});

export default router;