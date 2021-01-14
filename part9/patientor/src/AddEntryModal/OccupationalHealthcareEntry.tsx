import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import { TextField, DiagnosisSelection } from '../AddPatientModal/FormField';
import { useDiagnosesArrays } from './index';

type LocalComponentProps = {
  handleSubmit: <T>(values: T) => void;
};

const OccupationalHealthcareEntry: React.FC<LocalComponentProps> = ({ handleSubmit }) => {
  const arrayOfDiagnoses = useDiagnosesArrays();

  const initialValues = {
    type: 'OccupationalHealthcare',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    }
  };

  return(
    <Formik
      initialValues={initialValues}
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
        if(!values.employerName){
          errors.employerName = requiredError;
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
              placeholder='date'
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
              label='Employer name'
              name='employerName'
              placeholder='employer name'
              component={TextField}
            />

            <Field
              label='Start date'
              name='sickLeave.startDate'
              placeholder='start date'
              component={TextField}
            />

            <Field
              label='End date'
              name='sickLeave.endDate'
              placeholder='end date'
              component={TextField}
            />

            <Button type='submit' disabled={ !isValid || !dirty }>
              submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareEntry;