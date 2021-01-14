interface ReturnValue {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
interface DataToCalculate {
  arrayOfHours: number[],
  targetHours: number
}

export const calculateExercises = (dailyExerciseHours: number[], targetHoursPerDay: number): ReturnValue  => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hour => hour > 0).length;

  const totalExercisesHour = (accumulator: number, currentValue: number) => {
    if(currentValue >= 0){
      return accumulator + currentValue;
    }
    return accumulator;
  }

  const averageHours = dailyExerciseHours.reduce(totalExercisesHour)/periodLength;
  const success = averageHours >= targetHoursPerDay;

  let rating;
  if(averageHours >= targetHoursPerDay){
    rating = 3;
  } else if(averageHours >= targetHoursPerDay/2){
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription: string;
  switch(rating){
    case 3:
      ratingDescription = 'Great job, you have reached your target hours';
      break;
    case 2:
      ratingDescription = 'Try harder, you still haven\'t reach your target hours';
      break;
    default:
      ratingDescription = 'Weakness disgust me';
      break;
  }
  const target = targetHoursPerDay;
  const average = averageHours;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
};
const parseInput = (args: string[]): DataToCalculate => {
  if(args.length < 4){
    throw new Error('Need minimum inputs of 2');
  }
  args.shift();
  args.shift();
  args.forEach(argument => {
    if(isNaN(Number(argument))){
      throw new Error('You\'re only allowed to input numbers');
    }
  })
  const targetHours = Number(args.shift());
  const arrayOfHours = args.map(argument => Number(argument));
  return {
    arrayOfHours,
    targetHours
  }
}

try{
  const { arrayOfHours, targetHours } = parseInput(process.argv);
  console.log(calculateExercises(arrayOfHours, targetHours));
} catch(error){
  console.log('error: ', error.message);
}
