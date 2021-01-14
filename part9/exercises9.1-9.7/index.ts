import express from 'express';
import { calculateBmi as bmiCalculator} from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try{
    console.log('type of req is ', typeof req);
    console.log('type of res is ', typeof res);
    const query = req.query;
    const height = Number(query.height);
    const weight = Number(query.weight);
    if(isNaN(height) || isNaN(weight)){
      throw new Error();
    }
    console.log('height: ', height);
    console.log('weight: ', weight);
    const bmi = bmiCalculator(height, weight);
    res.json({
      weight,
      height,
      bmi
    })
  } catch {
    res.status(400).send({ error: 'malformatted id'});
  }
});

app.post('/exercises', (req, res) => {
  try{
    const exercisesHours: number[] = req.body.daily_exercises;
    const target: number = req.body.target;
    if(!exercisesHours || !target){
      throw new Error('parameters missing');
    }
    if(!Array.isArray(exercisesHours) || isNaN(target)){
      throw new Error('malformatted parameters');
    }
    exercisesHours.forEach(hour => {
      if(isNaN(hour)){
        throw new Error('malformatted parameters');
      }
    })
    console.log('exercisesHours: ', exercisesHours);
    console.log('target: ', target);

    const result = calculateExercises(exercisesHours, target);
    res.json(result);
  } catch (error){
    res.status(400).json({ error: error.message });
  }
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
})