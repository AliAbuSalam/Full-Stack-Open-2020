export const calculateBmi = (height: number, weight: number):string => {
  if(height <= 0){
    throw new Error('Please insert your height correctly');
  }
  if(weight <= 0){
    throw new Error('Please insert your weight correctly');
  }
  const bmi: number = (weight/(height * height)) * 10000;
  if(bmi >= 40){
    return 'Obese Class III (Very severely obese)';
  } else if (bmi >= 35){
    return 'Obese Class II (Severely obese)';
  } else if(bmi >= 30){
    return 'Obese Class I (Moderately obese)';
  } else if(bmi >= 25){
    return 'Overweight';
  } else if(bmi >= 18.5){
    return 'Normal (healthy weight)';
  } else if(bmi >= 16){
    return 'Underweight';
  } else {
    return 'Very severely underweight';
  }
};

try{
  if(process.argv.length < 4){
    throw new Error('Need inputs of height(cm) and weight(kg)');
  }
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
} catch(error){
  console.log('error: ', error.message);
}
