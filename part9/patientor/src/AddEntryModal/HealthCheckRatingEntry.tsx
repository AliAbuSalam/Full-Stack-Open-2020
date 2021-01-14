import React from 'react';
import { Formik, Field } from 'formik';
import { TextField, DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';
import { Form, Button } from 'semantic-ui-react';
import { useDiagnosesArrays } from './index';

export type HealthCheckRatingFormValues = {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: number;
};

type LocalComponentProps = {
  handleSubmit: <T>(values: T) => void;
};

const HealthCheckRatingEntry: React.FC<LocalComponentProps> = ({ handleSubmit }) => {
  const arrayOfDiagnoses = useDiagnosesArrays();

  const HealthCheckRatingInitialValue = {
    type: 'HealthCheck',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    healthCheckRating: 0
  };

  

  return(
    <Formik
      initialValues={HealthCheckRatingInitialValue}
      onSubmit={handleSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if(!values.description){
          errors.description = requiredError;
        }
        if(!values.date){
          errors.date = requiredError;
        }
        if(!values.specialist){
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched, handleSubmit, isValid, dirty }) => {
        return(
          <Form 
            className='form ui'
            onSubmit={handleSubmit}
          >
            <Field 
              label='Description'
              name='description'
              placeholder='description' 
              component={TextField}
            />

            <Field
              label='Date'
              name='date'
              placeholder='description'
              component={TextField}
            />

           <Field
              label='Specialist'
              name='specialist'
              placeholder='specialist'
              component={TextField}
          />

          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={arrayOfDiagnoses}
          />

          <Field
            label='HealthCheckRating'
            name='healthCheckRating'
            component={NumberField}
            min={0}
            max={3}
          />
          <Button type="submit" disabled={!isValid || !dirty}>
            submit
          </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default HealthCheckRatingEntry;