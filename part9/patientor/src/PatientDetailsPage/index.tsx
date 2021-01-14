import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Patient, Entry } from '../types';
import { useStateValue, updatePatient } from '../state';
import EntryDetails from '../EntryDetails';
import { Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

interface ParamsType {
  id: string;
}

const PatientDetailsPage: React.FC = () => {
  const id = useParams<ParamsType>().id;
  const [{ patients }, dispatch] = useStateValue();
  const patientIsExist = patients[id];
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = () => setModalOpen(false);
  
  const [patientDetails, setPatientsDetail] = useState<Patient | undefined>(patientIsExist);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if((!patientIsExist && !error) || (patientIsExist && !patientDetails?.ssn && !error)){
      axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
        .then(result => {
          dispatch(updatePatient(result.data));
          setPatientsDetail(result.data);
        })
        .catch(() => {
          console.log('fetching data failed');
          setError(true);
        });
    }
  }, [id, error, dispatch, setPatientsDetail, patientDetails]); // eslint-disable-line
  
  const submitNewEntry = async <T,>(values: T) => {
    try {
      const submitEntry = await axios.post(`${apiBaseUrl}/patients/${patientDetails?.id}/entries`, values);
      if(patientDetails){
        const newPatientEntry: Entry= submitEntry.data;
        const patientToUpdate = { ...patientDetails, entries: patientDetails?.entries?.concat(newPatientEntry)};
        dispatch(updatePatient(patientToUpdate));
        setPatientsDetail(patientToUpdate);
        closeModal();
      }
    } catch(e){
      console.log(e);
    }
  };

  if(error){
    return(
      <div>
        Patients with id {id} not found
      </div>
    );
  } else {
    return(
      <div>
        <h2>{patientDetails?.name} {patientDetails?.gender}</h2>
        <p>
          ssn: {patientDetails?.ssn} <br />
          occupation: {patientDetails?.occupation}
        </p>

        <h3>entries</h3>
        {patientDetails?.entries?.map(entry => {
          return <EntryDetails entry={entry} key={entry.id}/>;
         })}
         <div>
           <AddEntryModal modalOpen={modalOpen} closeModal={closeModal} handleSubmit={submitNewEntry}/>
          <Button onClick={openModal}>add entry</Button>
         </div>
      </div>
    );
  }
};

export default PatientDetailsPage;