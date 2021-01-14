import React from 'react';
import { Formik, Field } from 'formik';
import { TextField, DiagnosisSelection,  } from '../AddPatientModal/FormField';
import { Form, Button } from 'semantic-ui-react';
import { useDiagnosesArrays } from './index';

export type HospitalFormValue = {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCode: string[];
  discharge: {
    date: string;
    criteria: string;
  };
};

type HospitalEntryProps = {
  handleSubmit: <T>(value: T) => void;
};

const HospitalEntry: React.FC<HospitalEntryProps> = ({ handleSubmit }) => {
  const arrayOfDiagnoses = useDiagnosesArrays();
  const HospitalFormInitialValues={
    type: 'Hospital',
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
    discharge: {
      date: '',
      criteria: ''
    }
  };

  return(
    <Formik
      initialValues={HospitalFormInitialValues}
      onSubmit={handleSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: {
          description: string | undefined;
          date: string | undefined;
          specialist: string | undefined;
          discharge: {
            date: string | undefined;
            criteria: string | undefined;
          };
        } = {
          description: undefined,
          date: undefined,
          specialist: undefined,
          discharge: {
            date: undefined,
            criteria: undefined
          }
        };
        if(!values.description){
          errors.description = requiredError;
        }
        if(!values.date){
          errors.date = requiredError;
        }
        if(!values.specialist){
          errors.specialist = requiredError;
        }
        if((values.discharge.date && !values.discharge.criteria) || (!values.discharge.date && values.discharge.criteria)){
          if(!values.discharge.date){
            errors.discharge.date = requiredError;
          } else {
            errors.discharge.criteria = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched, handleSubmit, isValid, dirty }) => {
        return(
          <Form className='form ui' onSubmit={handleSubmit}>
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
              label='Discharge date'
              name='discharge.date'
              placeholder='Discharge date'
              component={TextField}
            />

            <Field
              label='Discharge criteria'
              name='discharge.criteria'
              placeholder='Discharge criteria'
              component={TextField}
            />
            <Button type='submit' disabled={!isValid || !dirty}>
              submit
            </Button>
          </Form>
        );
      }}
      
    </Formik>
  );
};

export default HospitalEntry;